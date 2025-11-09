import { collection, addDoc, Timestamp } from "firebase/firestore";
import{ db } from "./firabase";

export const saveBookToFireStore = async (isbn: string) => {
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