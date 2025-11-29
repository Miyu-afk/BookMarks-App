import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";
import { saveBookToFireStore } from "./lib/savebook";
import { useIsbnData } from "./hooks/useIsbnData";

interface BookData {
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

  const { data } = useIsbnData(getIsbn);

  useEffect(() => {
    if (!data || !getIsbn || !scanType) return;

    const bookData: BookData = {
      title: data.title ?? null,
      author: data.author ?? null,
      publisher: data.publisher ?? null,
      cover: data.cover ?? null,
      isbn: getIsbn,
    };

    setBook(bookData);

    saveBookToFireStore({
      isbn: bookData.isbn,
      title: bookData.title,
      cover: bookData.cover,
    });
  }, [data, getIsbn, scanType]);

  return (
    <>
      <BookMarksMain
        setGetIsbn={setGetIsbn}
        book={book}
        setScanType={setScanType}
      />
      {/* <Route path="/" element={<Login />} /> */}
    </>
  );
};

export default App;
