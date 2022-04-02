import './PlayerLookup.css';
import { PlayerLookupForm } from '../components/PlayerLookupForm';

function PlayerLookupPage() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg" className='App-logo' alt='logo' />
        <PlayerLookupForm />
      </header>
    </div>
  );
}

export default PlayerLookupPage;


