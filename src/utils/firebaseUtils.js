import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";

export const fetchPosts = async () => {
  try {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const createPost = async (post) => {
  try {
    await addDoc(collection(db, "posts"), {
      ...post,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
