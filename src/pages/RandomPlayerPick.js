import React from "react";
import { PrimaryButton } from "../components/Button";
import { PrimaryInput } from "../components/Input";
import { pick_random } from "../core/random";
import style from "./app.module.css";

export class RandomPlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [], chosen: "Key in some players to choose from" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      chosen: "The chosen one is: " + pick_random(this.state.players),
    });
  }

  handleAdd(event) {
    event.preventDefault();
    if (
      document.getElementById("playerName").value === "" ||
      this.state.players.includes(document.getElementById("playerName").value)
    ) {
      this.setState({ chosen: "Please key in a unique name" });
      return;
    }
    const player_elem = document.getElementById("playerName");
    this.setState({ players: [...this.state.players, player_elem.value] });
    player_elem.value = "";
  }

  render() {
    return (
      <div className={style.App}>
        <header className={style.header}>
          <div>
            <h1>Random Player</h1>
            <h4>Current players</h4>
            <ul>
              {this.state.players.map((player) => (
                <li key={player}>{player}</li>
              ))}
            </ul>
            <div>{this.state.chosen}</div>
            <form>
              <br />
              <PrimaryInput
                id="playerName"
                type="text"
                name="playerName"
                label="Player Name"
              />
              <br />
              <PrimaryButton type="add" onClick={this.handleAdd}>
                Add
              </PrimaryButton>
              <PrimaryButton type="submit" onClick={this.handleSubmit}>
                Pick Random
              </PrimaryButton>
            </form>
          </div>
          <br />
        </header>
      </div>
    );
  }
}
