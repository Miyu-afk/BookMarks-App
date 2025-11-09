import React, { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";
import { saveBookToFireStore } from "./lib/savebook";


const App: React.FC = () => {
  const [getIsbn, setGetIsbn] = useState<string | null>("")

  useEffect(() => {
    if(getIsbn){
      saveBookToFireStore(getIsbn);
    }
  }, [getIsbn]);

  return (
    // <Routes>
      <BookMarksMain setGetIsbn={setGetIsbn}/>
      /* <Route path="/" element={<Login />} /> */
    // </Routes>
  );
};

export default App;
