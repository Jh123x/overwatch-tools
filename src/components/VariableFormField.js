import React from "react";
import { player_lookup } from "../core/api";
import { containsObject } from "../core/utils";
import { player_balance_teams } from "../core/team_balancing";

export class VariableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: new Set(),
            currentValue: { playerName: '', battleTag: '' },
            results: "Enter some players to form a team."
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const key = event.target.name;
        let curr = this.state.currentValue;
        curr[key] = event.target.value;
        this.setState({ currentValue: { ...curr } });
    }

    clearForm() {
        document.getElementById("player_name").value = "";
        document.getElementById("battle_tag").value = "";
    }

    addFormFields() {
        if (containsObject(this.state.currentValue, this.state.formValues, ['playerName', 'battleTag'])) {
            alert("Player already exists!");
            return;
        }
        if (this.state.currentValue.playerName === '' || this.state.currentValue.battleTag === '') {
            alert("Please fill out all fields!");
            return;
        }
        let values = this.state.formValues;
        values.add(this.state.currentValue);
        this.setState(({
            formValues: values,
            currentValue: { playerName: '', battleTag: '' }
        }))
        this.clearForm();
    }
    removeFormField(player_name, battle_tag) {
        let values = new Set([...this.state.formValues].filter(({ playerName, battleTag }) => playerName !== player_name && battleTag !== battle_tag));
        this.setState({ formValues: values });
    }

    populateResults(results) {
        let [team1, team2] = player_balance_teams(results);
        console.log(team1, team2);

    }

    handleSubmit(event) {
        event.preventDefault();
        let results = []
        let values = [...this.state.formValues];
        for (let i = 0; i < values.length; i++) {
            let player = values[i];
            player.tank = document.getElementById(player.playerName + "_" + player.battleTag + "_tank").value;
            player.damage = document.getElementById(player.playerName + "_" + player.battleTag + "_damage").value;
            player.support = document.getElementById(player.playerName + "_" + player.battleTag + "_supports").value;
            player.overall = document.getElementById(player.playerName + "_" + player.battleTag + "_overall").value;
            results.push(player);
        }
        this.populateResults(results);
    }

    async fillLookup(playerName, battleTag) {
        let result = await player_lookup(playerName, battleTag);
        let rating_dict = {
            tank: 0,
            damage: 0,
            support: 0,
            overall: 0
        };
        let comp_ratings = result.ratings || [];
        for (let i = 0; i < comp_ratings.length; i++) {
            let rating = comp_ratings[i];
            rating_dict[rating.role] = rating_dict[rating.role] + rating.level;
        }
        document.getElementById(playerName + "_" + battleTag + "_tank").value = rating_dict.tank;
        document.getElementById(playerName + "_" + battleTag + "_damage").value = rating_dict.damage;
        document.getElementById(playerName + "_" + battleTag + "_supports").value = rating_dict.support;
    }

    displayResults() {
        let results = []
        this.state.formValues.forEach(({ playerName, battleTag }) => results.push(
            <tr key={playerName}>
                <th>{playerName}</th>
                <th>{battleTag}</th>
                <th>
                    <label>Tank</label><input id={playerName + "_" + battleTag + "_tank"} type="number" /><br />
                    <label>Damage</label><input id={playerName + "_" + battleTag + "_damage"} type="number" /><br />
                    <label>Support</label><input id={playerName + "_" + battleTag + "_supports"} type="number" /><br />
                    <label>Overall</label><input id={playerName + "_" + battleTag + "_overall"} type="number" /><br />
                </th>
                <th>
                    <button className="button remove" onClick={() => this.removeFormField(playerName, battleTag)}>Remove</button>
                    <button className="button lookup" onClick={async () => this.fillLookup(playerName, battleTag)}>Lookup</button>
                </th>
            </tr>
        ));
        return results;
    }

    render() {
        return (
            <div key="Results">
                <table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Battle Tag</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayResults()}
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-inline">
                        <label>Name</label>
                        <input type="text" id="player_name" name="playerName" onChange={this.handleChange} />
                        <label>Tag</label>
                        <input type="number" id="battle_tag" name="battleTag" onChange={this.handleChange} />
                    </div>
                    <div className="button-section">
                        <button className="button add" type="button" onClick={() => this.addFormFields()}>Add</button>
                        <button className="button clear" type="button" onClick={() => this.clearForm()}>Clear form</button>
                        <button className="button submit" type="submit">Create Teams</button>
                    </div>
                </form>
                <div id="results">
                    {this.state.results}
                </div>
            </div>

        );
    }
}