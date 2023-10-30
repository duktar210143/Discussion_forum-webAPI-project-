import React, { useEffect, useState } from "react";
import { UserProfileImage } from "../../Providers/ProfileImageContext"
import "./GetProfile.css";

const GetProfile = () => {
  const { profileImage, setProfileImage } = UserProfileImage();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

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
        setEmail(data.email);
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
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img className="profileimg" src={profileImage} alt="User Profile" />
      )}
      <h3 className="userName">{email}</h3>
    </div>
  );
};

export default GetProfile;
