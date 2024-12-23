import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogOut = async () => {
    console.log("Logout initiated");
    try {
      await signOut(auth);
      console.log("User signed out");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };
  
  const handleProfileClick = () => {
    navigate("/profile");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log(userDoc.data(), "Fetched User Data");
          setUserData(userDoc.data());
        } else {
          console.error("User document does not exist");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [user.uid]);

  return (
    <nav className="bg-gray-600 flex items-center justify-between px-4 py-2 shadow-md">
      {/* App Logo or Name */}
      <div className="text-white text-lg font-bold">
        Social Feed
      </div>

      {/* Profile Image */}
      <div 
        className="cursor-pointer flex items-center" 
      >
      <button onClick={handleLogOut} className="text-white text-lg font-bold">
  LogOut
</button>
        <img
        onClick={handleProfileClick}
          src={userData?.profilePhoto||"https://via.placeholder.com/40"} // Replace with actual profile image URL
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
};

export default Navbar;