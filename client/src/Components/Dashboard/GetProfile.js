import React, { useState, useEffect } from "react";
import { UserProfileImage } from "./ProfileImageContext";

const GetProfile = () => {
  const {profileImage,setProfileImage} = UserProfileImage();
  const [loading, setLoading] = useState(true);
  

  // Fetch profile from the server
  async function getProfile() {
    try {
      const token = localStorage.getItem("token");

      const req = await fetch("http://localhost:1337/api/getProfile", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

        const data = await req.json();
        if (data.status === "ok") {
          setLoading(false);
          setProfileImage("http://localhost:1337/" + data.profile);
        } else {
          alert(data.error);
        }
     
    } catch (error) {
      console.error("An error occurred while fetching the profile:", error);
      alert(
        "An error occurred while fetching the profile. Please check the console for details."
      );
    }
  }

  // Execute the getProfile function when the component mounts
  useEffect(() => {
    getProfile();
  }, [profileImage]); // An empty dependency array ensures this effect runs only once

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img
          src={profileImage}
          alt="User Profile"
          style={{ height: 100, width: 200 }}
        />
      )}
    </div>
  );
};

export default GetProfile;
