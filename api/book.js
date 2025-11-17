import { error } from "console";

export default async function handler(req, res) {
  const { isbn } = req.query;

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" });
  }

  try {
    const googleRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const googleData = await googleRes.json();

    if (googleData.items?.length > 0) {
      const v = googleData.items[0].volumeInfo;

      if (v.imageLink?.thumbnail) {
        return res.status(200).json({
          source: "google",
          title: v.title,
          authors: v.authors,
          publisher: v.publisher,
          publishedDate: v.publishedDate,
          cover: v.imageLinks.thumbnail,
        });
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
      return res.status(200).json({
        source: "openbd",
        title: d.summary?.title,
        authors: d.summary?.author,
        publisher: d.summary?.publisher,
        publishedDate: d.summary?.pubdate,
        cover: d.summary?.cover,
      });
    }
  } catch (e) {
    console.log("openBD error:", e);
  }

  const ndlCover = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;

  return res.status(200).json({
    source: "fallback-ndl",
    title: null,
    authors: null,
    publisher: null,
    publishedDate: null,
    cover: ndlCover,
  });
}
