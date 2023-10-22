import React from "react";
import "./Dashboard.css";
import homeImg from '../../Assets/Icons/home-3.png'
import bellpng from '../../Assets/Icons/bell.png'
import search from'../../Assets/Icons/search.png'
import defaultProfile from '../../Assets/Icons/default_profile.png'
import editpen from'../../Assets/Icons/editpen.png'

const Dashboard = () => {
  return (
    <div className="appbar-container">
      <div className="right-container">
        <img className="appbar-items" src={homeImg} alt="Home"/>
        <img  className="appbar-items" src={bellpng} alt="notification"/>
        <img  className="appbar-items" src={editpen} alt="notification" style={{width:'30px',height:'35px',paddingBottom:"20px"}} />

      </div>
      <div className="input-container">
        <img src={search} alt="search"></img>
        <input></input>
        <img src={defaultProfile} alt=""></img>
      </div>
    </div>
  );
};

export default Dashboard;
