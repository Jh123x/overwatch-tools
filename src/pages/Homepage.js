import React from "react";
import styles from "./app.module.css";

const homepage = () => {
  return (
    <div className={styles.App}>
      <div className={styles.header}>
        <h1>Overwatch Toolkit!</h1>
        <div className={styles.center}>
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
};

export default homepage;
