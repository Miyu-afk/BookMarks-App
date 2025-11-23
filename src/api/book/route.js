import { error } from "console";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return Response.json({ error: "ISBN is required" }, { status: 400 });
  }

  try {
    const googleRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const googleData = await googleRes.json();

    if (googleData.items?.length > 0) {
      const v = googleData.items[0].volumeInfo;

      if (v.imageLink?.thumbnail) {
        return Response.json(
          {
            source: "google",
            title: v.title,
            authors: v.authors,
            publisher: v.publisher,
            publishedDate: v.publishedDate,
            cover: v.imageLinks.thumbnail,
          },
          { status: 200 }
        );
      }
    }
  } catch (e) {
    console.log("Google Books API error:", e);
  }

  try {
    const openbdRes = await fetch(`https://api.openbd.jp/v1/get?isbn=${isbn}`);
    const openbdData = await openbdRes.json();
    const d = openbdData?.[0];

    if (d) {
      return Response.json(
        {
          source: "openbd",
          title: d.summary?.title,
          authors: d.summary?.author,
          publisher: d.summary?.publisher,
          publishedDate: d.summary?.pubdate,
          cover: d.summary?.cover,
        },
        { status: 200 }
      );
    }
  } catch (e) {
    console.log("openBD error:", e);
  }

  const ndlCover = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;

  return Response.json(
    {
      source: "fallback-ndl",
      title: null,
      authors: null,
      publisher: null,
      publishedDate: null,
      cover: ndlCover,
    },
    { status: 200 }
  );
}
