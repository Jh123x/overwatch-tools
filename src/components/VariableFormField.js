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
        this.setState({ results: "Generating Teams" });
        let [team1, team2] = player_balance_teams(results);
        let result = (<div>
            <h3>Team 1</h3>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {team1.map(({ playerName, battleTag, role }) => (
                        <tr key={playerName + "#" + battleTag}>
                            <td>{playerName + "#" + battleTag}</td>
                            <td>{role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Team 2</h3>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>role</th>
                    </tr>
                </thead>
                <tbody>
                    {team2.map(({ playerName, battleTag, role }) => (
                        <tr key={playerName + "#" + battleTag}>
                            <td>{playerName + "#" + battleTag}</td>
                            <td>{role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
        this.setState({ results: result });
    }

    handleSubmit(event) {
        if (this.state.formValues.size === 0) {
            alert("Please add players to the team!");
            return;
        }
        event.preventDefault();
        let results = []
        let values = [...this.state.formValues];
        for (let i = 0; i < values.length; i++) {
            let player = values[i];
            player.rating = document.getElementById(player.playerName + "_" + player.battleTag + "_overall").value;
            results.push(player);
        }
        this.populateResults(results);
    }

    async fillLookup(playerName, battleTag, role) {

        let result = await player_lookup(playerName, battleTag);
        const id = playerName + "_" + battleTag + "_overall";
        const elem = document.getElementById(id);
        if (result.rating === null) {
            elem.value = 0;
            console.error(`Error: ${result.error}`);
            return;
        }
        if (role === "Overall") {
            elem.value = result.rating || 0;
            return;
        }
        if (result.ratings === null) {
            return 0;
        }
        for (let i = 0; i < result.ratings.length; ++i) {
            let curr = result.ratings[i];
            if (curr.role === role.toLowerCase()) {
                elem.value = curr.level;
                return;
            }
        }
        elem.value = 0;
    }

    displayResults() {
        let results = []
        this.state.formValues.forEach(({ playerName, battleTag }) => results.push(
            <tr key={playerName}>
                <th>{playerName}</th>
                <th>{battleTag}</th>
                <th>
                    <label>Rating</label><input id={playerName + "_" + battleTag + "_overall"} type="number" /><br />
                </th>
                <th>
                    <select id={playerName + "_role"}>
                        <option>
                            Overall
                        </option>
                        <option>
                            Tank
                        </option>
                        <option>
                            Damage
                        </option>
                        <option>
                            Support
                        </option>
                    </select>
                    <button className="button remove" onClick={() => this.removeFormField(playerName, battleTag)}>Remove</button>
                    <button className="button lookup" onClick={async () => this.fillLookup(playerName, battleTag, document.getElementById(playerName + "_role").value)}>Lookup</button>
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