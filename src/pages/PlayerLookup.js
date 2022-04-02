import './PlayerLookup.css';
import { PlayerLookupForm } from '../components/PlayerLookupForm';

function PlayerLookupPage() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg'
          className='App-logo'
          alt='logo'
        />
        <div>
          <h1>Player Lookup toolkit</h1>
          <p>Note that the name is case sensitive</p>
          <p>It is in the format name#tag</p>
        </div>
        <PlayerLookupForm />
      </header>
    </div>
  );
}

export default PlayerLookupPage;
