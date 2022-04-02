import React from 'react';
import './Homepage.css';

function homepage() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg'
          className='App-logo'
          alt='logo'
        />
        <h1>Welcome to the Overwatch Toolkit!</h1>
        <div className='center-div'>
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
      </header>
    </div>
  );
}

export default homepage;
