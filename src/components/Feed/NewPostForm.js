import React, { useState, useRef } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, Camera, Image } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NewPostForm = () => {
  const navigate=useNavigate();
  const [postText, setPostText] = useState("");
  const [postImages, setPostImages] = useState([]);
  const [postVideos, setPostVideos] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const handleBackClick=()=>{
    navigate("/");
  }
  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = async (e) => {
    if (!e || !e.target || !e.target.files) {
      return; 
    }
    
    const files = Array.from(e.target.files);
    try {
      const promises = files.map((file) => convertToBase64(file));
      const base64Results = await Promise.all(promises);
      setPostImages(base64Results);
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };
  

  const handleVideoChange = async (e) => {
    const files = Array.from(e.target.files);
    setPostVideos(files);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postText && postImages.length === 0 && postVideos.length === 0) {
      setError("Post must contain text, image, or video");
      return;
    }

    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        userId: user.uid,
        userName: user.displayName || user.email,
        profilePhoto:
          user.photoURL || "https://example.com/default-profile-photo.png",
        content: {
          text: postText,
          images: postImages.map((image) => image),
          videos: postVideos.map((video) => video),
        },
        timestamp: serverTimestamp(),
      });

      setPostText("");
      setPostImages([]);
      setPostVideos([]);
      setError(null);
    } catch (err) {
      setError("Error creating post: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 flex items-center gap-4 bg-white px-4 py-3 border-b">
        <button className="text-gray-600">
          <ArrowLeft onClick={handleBackClick} className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold">New post</h1>
      </header>
      
      <main className="p-4">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handlePostSubmit} className="bg-white rounded-lg shadow">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 text-lg border-none resize-none focus:outline-none"
            rows="6"
          />
          
          <div className="border-t px-4 py-3">
            <button
              type="button"
              onClick={handleFileClick}
              className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded"
            >
              <Image className="h-6 w-6 mr-2" />
              Photos
            </button>
            <input
              type="file"
              accept="image/*,video/*"
              ref={fileInputRef}
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="flex items-center text-gray-600 hover:bg-gray-100 px-2 py-1 rounded mt-2"
            >
              <Camera className="h-6 w-6 mr-2" />
              Camera
            </button>
            <input
              type="file"
              accept="image/*,video/*"
              capture="user"
              ref={videoInputRef}
              multiple
              onChange={handleVideoChange}
              className="hidden"
            />
          </div>
        </form>
      </main>

      <div className="fixed inset-x-0 bottom-0 p-4">
        <button
          onClick={handlePostSubmit}
          className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default NewPostForm;

