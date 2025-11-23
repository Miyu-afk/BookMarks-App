import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";
import { saveBookToFireStore } from "./lib/savebook";


interface BookData{
  title: string;
  author: string;
  publisher: string;
  cover: string;
  isbn: string;
}

const App: React.FC = () => {
  const [getIsbn, setGetIsbn] = useState<string | null>("");
  const [book, setBook] = useState<BookData | null>(null);
  const [scanType, setScanType] = useState<"want" | "read" | "">("");

  useEffect(() => {
    if (!getIsbn || !scanType) return;
    const fetchBook = async () => {
      const res = await fetch(`/api/book?isbn=${getIsbn}`);
      const data = await res.json();
      const info = data[0]?.summary;
      if (!info) return;

      const bookData:BookData = {
        title:info.title,
        author: info.author,
        publisher: info.publisher,
        cover: info.cover,
        isbn: getIsbn,
      };

      setBook(bookData);

      saveBookToFireStore(getIsbn);


    };

    fetchBook();
  }, [getIsbn, scanType]);

  return (
    <>
    <BookMarksMain setGetIsbn={setGetIsbn} book={book} setScanType={setScanType} />
    {/* <Route path="/" element={<Login />} /> */}
    </>
  );
};

export default App;
