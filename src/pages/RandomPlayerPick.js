import React from "react";
import { pick_random } from "../core/random";

export class RandomPlayerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: [], chosen: 'Key in some players to choose from' }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ chosen: "The chosen one is: " + pick_random(this.state.players) });
    }

    handleAdd(event) {
        event.preventDefault();
        if (document.getElementById('playerName').value === '' || this.state.players.includes(document.getElementById('playerName').value)) {
            this.setState({ chosen: 'Please key in a unique name' });
            return;
        }
        const player_elem = document.getElementById('playerName')
        this.setState({ players: [...this.state.players, player_elem.value] });
        player_elem.value = '';
    }

    render() {
        return (<div className='App'>
            <header className='App-header'>
                <img
                    src='https://upload.wikimedia.org/wikipedia/commons/5/55/Overwatch_circle_logo.svg'
                    className='App-logo'
                    alt='logo'
                />
                <div>
                    <h1>Random Player</h1>
                    <h4>Current players</h4>
                    <ul>
                        {this.state.players.map((player) => <li key={player}>{player}</li>)}
                    </ul>
                    <div>
                        {this.state.chosen}
                    </div>
                    <form>
                        <label>Player Name</label>
                        <br />
                        <input id='playerName' type='text' name='playerName' />
                        <br />
                        <button type='add' onClick={this.handleAdd}>Add</button>
                        <button type='submit' onClick={this.handleSubmit}>Pick Random</button>
                    </form>
                </div>
                <br />
            </header>
        </div>)
    };
}