import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Feed from "../components/Feed/Feed";
import { useNavigate } from "react-router-dom";
import EditProfile from "../components/Feed/EditProfile";
import Navbar from "../components/Navbar";
const Home = () => {
  const navigate = useNavigate();

  const handleNewPost = () => {
    navigate("/newpost"); // This ensures navigation only happens on click
  };

  return (
    <div>
    <Navbar/>
      <h1 style={{marginLeft:83.6,fontSize:"35px",fontWeight:"bold"}} className="ml=83.6,font-bold">Feeds</h1>
      <Fab
        
        aria-label="add"
        style={{
            color:"white",
          backgroundColor: "black",
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={handleNewPost} // Correctly handle click event here
      >
        <AddIcon />
      </Fab>
      <Feed />
    </div>
  );
};

export default Home;
