import React from "react";
import { Home } from "lucide-react";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import { PenSquare } from "lucide-react";
import "./AppBar.css";

const AppBar = (props) => {
  return (
    <div>
      <div className="AppBar">
        <div className="logoName">Discussion Forum</div>
        <div className="right-container">
          <div className="appbar-items">
            <Home strokeWidth={1.5} color="black" style={{ opacity: 0.7 }} />
          </div>
          <div className="appbar-items">
            <Bell strokeWidth={1.5} color="black" style={{ opacity: 0.7 }} />
          </div>
          <button className="button-reset" onClick={props.openQuestionModal}>
            <div className="appbar-items">
              <div className="penSquare-icon">
                <PenSquare strokeWidth={1.5} color="black" style={{ opacity: 0.7 }} />
              </div>
            </div>
          </button>
        </div>
        <div className="input-container">
          <Search strokeWidth={2} style={{ opacity: 0.3 }} />
          <input></input>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
