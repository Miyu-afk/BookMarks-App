import Footer from "./Footer";
import Header from "./Header";
import Contents from "./Contents";
import type { Dispatch, SetStateAction } from 'react'

interface BookData{
  title: string;
  author: string;
  publisher: string;
  cover: string;
  isbn: string;
}

interface BookMarksMainProps{
  setGetIsbn:Dispatch<SetStateAction<string | null>>;
  book: BookData | null;
  setScanType: Dispatch<SetStateAction<"want" | "read" | "" >>;
}

const BookMarksMain = ({ setGetIsbn, book, setScanType }:BookMarksMainProps) => {
  
  return (
    <>
      <Header />
      <div className="container ml-2 mr-2">
        <Contents setGetIsbn={setGetIsbn} book={book} setScanType={setScanType}/>
      </div>
      <Footer />
    </>
  );
};

export default BookMarksMain;
