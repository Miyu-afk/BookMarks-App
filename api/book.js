import { error } from "console";

export default async function handler(req, res) {
  const { isbn } = req.query;
  
  if(!isbn){
    return res.status(400).json({ error: "ISBN is required" });
  }

  try {
    const googleRes = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const googleData = await googleRes.json();

    if(googleData.items?.length > 0){
      const v= googleData.items[0].volumeInfo;

      if(v.imageLink?.thumbnail){
        return res.status(200).json({
          
        })
      }
    }
  }
}