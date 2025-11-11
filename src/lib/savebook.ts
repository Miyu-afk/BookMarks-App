import { collection, addDoc, Timestamp, doc, setDoc, getDoc } from "firebase/firestore";
import{ db } from "./firabase";

export const saveBookToFireStore = async (isbn: string) => {
  if(!isbn) return;

  const bookRef = doc(db, "books", isbn);
  const existing = await getDoc(bookRef);

  if(!existing.exists()){
    await setDoc(bookRef, { isbn, addedAt: new Date()});
    console.log("Firestoreに保存しました;", isbn);
  } else {
    console.log("すでに保存済み:", isbn);
  }
  
  try {
    await addDoc(collection(db, "books"), {
      isbn,
      createdAt:Timestamp.now(),
    });
    console.log("Firestoreに保存しました:", isbn);
  }catch (error){
    console.error("Firestore保存エラー:", error);
  }
};