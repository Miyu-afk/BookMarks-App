import React from "react";
import { Routes, Route } from "react-router-dom";
// import Login from "./accounts/LogIn";
import BookMarksMain from "./components/BookMarksMain";

const App: React.FC = () => {

  return (
    <Routes>
      <Route path="/main" element={<BookMarksMain />} />
      {/* <Route path="/" element={<Login />} /> */}
    </Routes>
  );
};

export default App;
