import { PlayerLookupForm } from "../components/PlayerLookupForm";
import style from "./app.module.css";

function PlayerLookupPage() {
  return (
    <div className={style.App}>
      <div className={style.header}>
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
