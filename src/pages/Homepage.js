import React from "react";
import "./Homepage.css";
import { mainLogo } from "../components/MainLogo";

function homepage() {
  return (
    <div className="App">
      <div className="App-header">
        {mainLogo}
        <h1>Welcome to the Overwatch Toolkit!</h1>
        <div className="center-div">
          <p>
            This toolkit is designed to help overwatch players make the games
            they play more enjoyable. Feel free to use the navigation bar to
            find out the rest of our features.
          </p>
          <p>
            More features will be added over time.
            <br />
            Stay Tuned!
          </p>
        </div>
      </div>
    </div>
  );
}

export default homepage;
