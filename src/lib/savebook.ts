import { Timestamp, doc, setDoc, getDoc } from "firebase/firestore";
import{ db } from "./firabase";

interface BookDataForSave{
  isbn: string;
  title: string | null;
  cover: string | null;
}

export const saveBookToFireStore = async (book:BookDataForSave) => {
  const { isbn, title, cover } = book;

  if(!isbn) return;

  const bookRef = doc(db, "books", isbn);
  const existing = await getDoc(bookRef);

  if(!existing.exists()){
    await setDoc(bookRef, { 
      isbn,
      title,
      cover,
      addedAt: Timestamp.now()});
    console.log("Firestoreに新規保存しました;", isbn);
  } else {
    await setDoc(
      bookRef, {
        title: title ?? existing.data().title,
        cover: cover ?? existing.data().cover,
      },
      { merge: true}
    );
    console.log("既存データを更新しました。:", isbn);
  }
};