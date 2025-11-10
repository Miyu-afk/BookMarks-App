import Footer from "./Footer";
import Header from "./Header";
import Contents from "./Contents";
import type { Dispatch, SetStateAction } from 'react'

interface BookMarksMainProps{
  setGetIsbn:Dispatch<SetStateAction<string | null>>;
  book: string;
}

const BookMarksMain = ({ setGetIsbn, book }:BookMarksMainProps) => {
  
  return (
    <>
      <Header />
      <div className="container ml-2 mr-2">
        <Contents setGetIsbn={setGetIsbn} book={book}/>
      </div>
      <Footer />
    </>
  );
};

export default BookMarksMain;
