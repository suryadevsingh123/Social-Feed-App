import { auth, db } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Sign up with email and password
export const signUp = async (email, password, username) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      userName: username || "Anonymous",
      email: user.email,
      profilePhoto: "https://example.com/default-profile-photo.png", // Default image or blank
      bio: "", // You can leave the bio empty for now
    });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Log in with email and password
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Google login
export const logInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user",JSON.stringify(user));
    // Extract user details
    const { uid, email, displayName } = user;

    // Fetch existing Firestore document
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    // Only set default values if the document doesn't exist
    if (!userDoc.exists()) {
      await setDoc(
        userDocRef,
        {
          userName: displayName || "Anonymous", // Default name if displayName is null
          email: email,
          profilePhoto: "https://example.com/default-profile-photo.png", // Default image
          bio: "", // Leave bio empty for now
        },
        { merge: true }
      );
    }

    return user;
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    throw error;
  }
};


// Log out
export const logOut = async (navigate) => {
  console.log("logout")
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};