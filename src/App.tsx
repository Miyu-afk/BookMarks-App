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
  const [book, setBook] = useState("");
  const [scanType, setScanType] = useState<"want" | "read" | "">("");

  useEffect(() => {
    if (getIsbn) {
      saveBookToFireStore(getIsbn);
    }
  }, [getIsbn]);

  useEffect(() => {
    if (!getIsbn || !scanType) return;
    const fetchBook = async (getIsbn:string) => {
      const res = await fetch(`/api/book?isbn=${getIsbn}`);
      const data = await res.json();
      return data;
    }
    const run = async() => {
      const book = await fetchBook(getIsbn);
      console.log(book);
      setBook(book);
    };
    run();
  }, [getIsbn]);
  return (
    <>
    <BookMarksMain setGetIsbn={setGetIsbn} book={book} />
    {/* <Route path="/" element={<Login />} /> */}
    </>
  );
};

export default App;
