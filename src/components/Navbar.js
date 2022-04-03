import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <Link to='/'>Home</Link>
        <Link to='/lookup'>Player Lookup</Link>
        <Link to='/team-balancing'>Team Balancing</Link>
      </div>
    );
  }
}
