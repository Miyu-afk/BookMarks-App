import Footer from "./Footer";
import Header from "./Header";
import Contents from "./Contents";
import type { Dispatch, SetStateAction } from 'react'

interface BookMarksMainProps{
  setGetIsbn:Dispatch<SetStateAction<string | null>>;
}

const BookMarksMain = ({ setGetIsbn }:BookMarksMainProps) => {
  
  return (
    <>
      <Header />
      <div className="container ml-2 mr-2">
        <Contents setGetIsbn={setGetIsbn}/>
      </div>
      <Footer />
    </>
  );
};

export default BookMarksMain;
