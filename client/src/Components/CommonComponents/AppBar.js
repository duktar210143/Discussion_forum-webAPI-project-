import React from "react"
import "./AppBar.css"

const AppBar = (props) => {
    return(
        <div className="AppBar">
            {props.children}
        </div>
    )
}

export default AppBar;