import Footer from "./Footer";
import Header from "./Header";
import Contents from "./Contents";

const BookMarksMain = () => {
  return (
    <>
      <Header />
      <div className="container ml-2 mr-2">
        <Contents />
      </div>
      <Footer />
    </>
  );
};

export default BookMarksMain;
