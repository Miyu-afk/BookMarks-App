export default async function handler(req, res) {
  const { isbn } = req.query;

  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required" });
  }

  const url = `https://ndlsearch.ndl.go.jp/opensearch?isbn=${isbn}`;

  try {
    const response = await fetch(url);
    const xml = await response.text();

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(xml);
  } catch (error) {
    console.error("NDL Proxy Error:", error);
    res.status(500).json({ error: "NDL API request failed" });
  }
}
