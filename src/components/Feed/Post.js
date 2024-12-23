import React from "react";
import { useNavigate } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import ShareModal from "./ShareModal";
const Post = ({ post }) => {
  const { userName, profilePhoto, content, timestamp } = post;
  const allContent = [...content.images, ...content.videos];
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleLikeClick = () => {
    setLike(!like);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow mb-4">
      <div className="flex items-center mb-3">
        <img
          onClick={handleProfileClick}
          src={profilePhoto}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
        />
        <div className="ml-3">
          <p
            onClick={handleProfileClick}
            className="font-semibold cursor-pointer	"
          >
            {userName}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(timestamp?.seconds * 1000).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="mb-3">{content.text}</p>
      <div className="flex flex-col items-center relative cursor-pointer">
        <SimpleImageSlider
          width={606}
          height={605}
          images={allContent}
          showBullets={true}
          showNavs={true}
        />
        <div className="flex">
          <FavoriteIcon
            className="favorite-icon"
            sx={{
              zIndex: 10,
              cursor: "pointer",
              position: "absolute",
              left: "10px",
              color: like ? "red" : "gray",
              fontSize: "21px",
            }}
            onClick={handleLikeClick}
          />
          {/* <SendIcon sx={{ position: "absolute", right: "10px",color:"black" }} /> */}
          <div
          onClick={() => setOpen(true)}
          className="absolute right-2 flex items-center bg-white rounded "
          style={{ zIndex: 10 }}
        >
          <SendIcon
            sx={{
              color: "black", // Blue color
              fontSize: "24px",
              marginRight: "8px",
            }}
          />
          <span className="text-gray-700 font-medium">Share</span>
        </div>
          {/* <button
            
          >
            Share
          </button> */}
        </div>
      </div>
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        url="https://www.example.com/post/123"
      />
    </div>
  );
};

export default Post;
