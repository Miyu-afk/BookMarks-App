import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";
import { saveBookToFireStore } from "./lib/savebook";
import axios from "axios";
import { parseStringPromise } from "xml2js";

const App: React.FC = () => {
  const [getIsbn, setGetIsbn] = useState<string | null>("");
  const [book, setBook] = useState("");

  useEffect(() => {
    if (getIsbn) {
      saveBookToFireStore(getIsbn);
    }
  }, [getIsbn]);

  useEffect(() => {
    if (!getIsbn) return;

    axios
      .get(
        `https://ndlsearch.ndl.go.jp/opensearch?isbn=${getIsbn}`)
      .then(async(results) => {
        const jsonData = await parseStringPromise(results.data);
        console.log(jsonData);
        const bookData = jsonData.feed.entry?.[0];
        setBook(bookData?.title?.[0] || "タイトル不明");
      })
      .catch((error) => {
        console.log("国立図書館APIエラー:");
        console.log(error.status);
      });
  }, [getIsbn]);
  return (
    // <Routes>
    <BookMarksMain setGetIsbn={setGetIsbn} book={book} />
    /* <Route path="/" element={<Login />} /> */
    // </Routes>
  );
};

export default App;
