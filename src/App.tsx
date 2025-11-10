import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";
import { saveBookToFireStore } from "./lib/savebook";
import axios from "axios";

const App: React.FC = () => {
  const [getIsbn, setGetIsbn] = useState<string | null>("")
  const [book, setBook] = useState("");

  useEffect(() => {
    if(getIsbn){
      saveBookToFireStore(getIsbn);
    }
  }, [getIsbn]);

  useEffect(()=> {
  axios.get(`https://ndlsearch.ndl.go.jp/search?cs=bib&display=panel&from=0&size=20&keyword=${getIsbn}&f-ht=ndl&f-ht=library`)
    .then((results)=>{
      console.log(results.data);
      setBook(results.data.results[0])
    })
    .catch((error) => {
      console.log('失敗');
      console.log(error.status);
    });
});
  return (
    // <Routes>
      <BookMarksMain setGetIsbn={setGetIsbn} book={book}/>
      /* <Route path="/" element={<Login />} /> */
    // </Routes>
  );
};

export default App;
