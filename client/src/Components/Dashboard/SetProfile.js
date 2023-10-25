import React, { useEffect, useState } from "react";
import { UserProfileImage } from "./ProfileImageContext";


const SetProfile = () => {
  const {profileImage,setProfileImage} = UserProfileImage();

  // send fetch request to post the profile picture
  async function fectchProfile() {
    const formData = new FormData();
    formData.append("image", profileImage);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("token not found");
        return;
      }
      // Post request to upload the image to database and save temporarily in server
      const response = await fetch("http://localhost:1337/api/setProfile", {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
        body: formData,
      });
      const data = await response.json();
      console.log("Server Response:", data);
      if (data.status === "ok") {
        console.log("Image saved in database");
        setProfileImage("http://localhost:1337/"+data.profile)
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
      fectchProfile()
    }
  }, [profileImage]);
  return (
    <div>
      <input type="file" onChange={HandleImageChange} />
    </div>
  );
};

export default SetProfile;
