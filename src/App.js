import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NewPostForm from "./components/Feed/NewPostForm";
import AuthWrapper from "./components/Auth/AuthWrapper";
import EditProfile from "./components/Feed/EditProfile";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <AuthWrapper> <Home /> </AuthWrapper> } />
        <Route path="/newpost" element={ <AuthWrapper> <NewPostForm /> </AuthWrapper> } />
        <Route path="/profile" element={ <AuthWrapper> <EditProfile /> </AuthWrapper> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
