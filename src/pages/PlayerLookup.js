import "./PlayerLookup.css";
import { PlayerLookupForm } from "../components/PlayerLookupForm";
import { mainLogo } from "../components/MainLogo";

function PlayerLookupPage() {
  return (
    <div className="App">
      <div className="App-header">
        {mainLogo}
        <div>
          <h1>Player Lookup toolkit</h1>
          <p>Note that the name is case sensitive</p>
          <p>It is in the format name#tag</p>
        </div>
        <PlayerLookupForm />
        <br />
      </div>
    </div>
  );
}

export default PlayerLookupPage;
