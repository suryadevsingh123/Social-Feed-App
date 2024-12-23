import { ArrowLeft, PenSquare, Camera } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const profilePhotoRef = useRef();
  const [userData, setUserData] = useState(null);

  const handleClick = () => {
    navigate("/");
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

  const handleProfilePhotoOnChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = () => {
        console.log("Profile Photo Updated:", reader.result);
        setUserData((prevData) => ({ ...prevData, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoClick = () => {
    profilePhotoRef.current.click();
  };

  const handleSaveChanges = async () => {
    if (!userData) return;

    try {
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("User data updated successfully");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user data:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="relative h-48">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=192&width=384"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/70 to-orange-500/70" />
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition">
            <PenSquare className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex items-center p-4">
          <button
            onClick={handleClick}
            className="p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-2xl font-semibold text-white">
            Edit Profile
          </h1>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="px-6 -mt-14 mb-8 flex justify-start">
        <div className="relative inline-block">
          <img
            style={{
              width: 250,
              height: 250,
              border: "4px solid white",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
            }}
            src={userData?.profilePhoto || "/default-avatar.png"}
            alt="Profile Photo"
          />
          <button
            onClick={handleProfilePhotoClick}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition"
          >
            <Camera className="h-5 w-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={profilePhotoRef}
            onChange={handleProfilePhotoOnChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Section */}
      <form className="px-6 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            placeholder="Enter your name"
            className="w-full rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500 shadow-sm"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prevData) => ({ ...prevData, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            placeholder="Write something about yourself"
            className="w-full min-h-[120px] rounded-lg border-gray-300 focus:border-rose-500 focus:ring-rose-500 shadow-sm"
            value={userData?.bio || ""}
            onChange={(e) =>
              setUserData((prevData) => ({ ...prevData, bio: e.target.value }))
            }
          />
        </div>

        <div className="fixed inset-x-0 bottom-0 px-6 pb-6 bg-white shadow-lg">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold hover:bg-rose-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
