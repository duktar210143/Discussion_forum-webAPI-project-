import React, { useEffect, useState } from "react";
import { UserProfileImage } from "../../Providers/ProfileImageContext";
import "./SetProfile.css";

const SetProfile = () => {
  const { profileImage, setProfileImage } = UserProfileImage();
  const [isEditing, setIsEditing] = useState(false);

  // send fetch request to post the profile picture
  async function fectchProfile() {
    if (!profileImage) {
      // Don't make a request if no file is selected
      return;
    }
    const formData = new FormData();
    formData.append("image", profileImage);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("token not found");
        return;
      }
      // Post request to upload the image to database and save temporarily in server
      const req = await fetch("http://localhost:1337/api/setProfile", {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
      });
      const data = await req.json();
      console.log("Server Response:", data);
      if (data.status === "ok") {
        console.log("Image saved in database");
        setProfileImage("http://localhost:1337/" + data.profile);
        setIsEditing(false);
      }
    } catch {
      console.error("Error:");
    }
  }

  function HandleImageChange(e) {
    setProfileImage(e.target.files[0]);
  }

  useEffect(() => {
    if (profileImage) {
      // side effect of image fetch request
      fectchProfile();
    }
  }, [profileImage]);
  return (
    <div className="file-upload-container">
      {isEditing ? (
        <label className="file-upload-label">
          Upload Profile Picture
          <input
            type="file"
            className="custom-file-input"
            onChange={HandleImageChange}
          />
        </label>
      ) : (
        <button className="Edit-btn" onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default SetProfile;
