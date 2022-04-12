import React from "react";
import { player_lookup } from "../core/api";
import { containsObject } from "../core/utils";
import { player_balance_teams } from "../core/team_balancing";
import { PrimaryButton } from "./Button";
import { PrimaryInput } from "./Input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { SelectMenu, OrangeMenuItem } from "./SelectMenu";

export class VariableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: new Set(),
            currentValue: { playerName: '', battleTag: '' },
            results: "Enter some players to form a team.",
            roleSelection: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRoleSelection = this.handleRoleSelection.bind(this);
    }

    handleChange(event) {
        const key = event.target.name;
        let curr = this.state.currentValue;
        curr[key] = event.target.value;
        this.setState({ currentValue: { ...curr } });
    }

    handleRoleSelection(event, playerName, battleTag) {
        event.preventDefault();
        const result = this.state.roleSelection;
        result[playerName + "#" + battleTag] = event.target.value;
        this.setState({ roleSelection: result });
    }

    clearForm() {
        document.getElementById("player_name").value = "";
        document.getElementById("battle_tag").value = "";
    }

    addFormFields() {
        const playerName = this.state.currentValue.playerName;
        const battleTag = this.state.currentValue.battleTag;
        if (containsObject(this.state.currentValue, this.state.formValues, ['playerName', 'battleTag'])) {
            alert("Player already exists!");
            return;
        }
        if (playerName === '' || battleTag === '') {
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
        const result = this.state.roleSelection;
        result[playerName + "#" + battleTag] = "Overall";
        this.setState({ roleSelection: result });
    }
    removeFormField(player_name, battle_tag) {
        let values = new Set([...this.state.formValues].filter(({ playerName, battleTag }) => playerName !== player_name && battleTag !== battle_tag));
        this.setState({ formValues: values });
    }

    generateTable(team_name, team) {
        return <div>
            <h3>{team_name}</h3>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {team.map(({ playerName, battleTag, role }) => (
                        <TableRow key={playerName + "#" + battleTag}>
                            <TableCell>{playerName + "#" + battleTag}</TableCell>
                            <TableCell>{role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>;
    }

    populateResults(results) {
        this.setState({ results: "Generating Teams" });
        let [team1, team2] = player_balance_teams(results);
        let result = (<div>
            {this.generateTable("Team 1", team1)}
            {this.generateTable("Team 2", team2)}
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

    async fillLookup(playerName, battleTag) {
        const role = this.state.roleSelection[playerName + "#" + battleTag];
        const id = playerName + "_" + battleTag + "_overall";
        const elem = document.getElementById(id);
        let result = await player_lookup(playerName, battleTag);
        if (result.rating === null) {
            elem.value = 0;
            console.error(`Error: ${result.error}`);
            return;
        }
        if (role === "Overall") {
            elem.value = result.rating || 0;
            return;
        }
        if (result.ratings === null || result.ratings === undefined) {
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

    render_row(playerName, battleTag) {
        return <TableRow key={playerName + "#" + battleTag}>
            <TableCell>{playerName}</TableCell>
            <TableCell>{battleTag}</TableCell>
            <TableCell>
                <PrimaryInput
                    id={playerName + "_" + battleTag + "_overall"}
                    type="number"
                    label="Rating"
                    placeholder="Rating"
                />
            </TableCell>
            <TableCell>
                <SelectMenu
                    id={playerName + "_role"}
                    label="Role"
                    defaultValue="Overall"
                    onChange={(event) => this.handleRoleSelection(event, playerName, battleTag)}
                >
                    <OrangeMenuItem value="Overall" key="Overall">
                        Overall
                    </OrangeMenuItem>
                    <OrangeMenuItem value="Tank" key="Tank">
                        Tank
                    </OrangeMenuItem>
                    <OrangeMenuItem value="Damage" key="Damage">
                        Damage
                    </OrangeMenuItem>
                    <OrangeMenuItem value="Support" key="Support">
                        Support
                    </OrangeMenuItem>
                </SelectMenu>
                <PrimaryButton
                    className="button remove"
                    onClick={() => this.removeFormField(playerName, battleTag)}
                >
                    Remove
                </PrimaryButton>
                <PrimaryButton
                    className="button lookup"
                    onClick={async () => this.fillLookup(playerName, battleTag)}
                >
                    Lookup
                </PrimaryButton>
            </TableCell>
        </TableRow>
    }

    displayResults() {
        let results = []
        this.state.formValues.forEach(({ playerName, battleTag }) => results.push(
            this.render_row(playerName, battleTag)
        ));
        return results;
    }

    get_table() {
        return <table id="table">
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
        </table>;
    }

    render() {
        return (
            <div key="Results">
                {this.state.formValues.size > 0 ? this.get_table() : null}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-inline">
                        <PrimaryInput
                            type="text"
                            label="Name"
                            id="player_name"
                            name="playerName"
                            placeholder="Player Name"
                            onChange={this.handleChange}
                        />
                        <PrimaryInput
                            label="Tag"
                            type="number"
                            id="battle_tag"
                            name="battleTag"
                            placeholder="Battle Tag"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="button-section">
                        <PrimaryButton
                            className="button add"
                            type="button"
                            onClick={() => this.addFormFields()}
                        >
                            Add
                        </PrimaryButton>
                        <PrimaryButton
                            className="button clear"
                            type="button"
                            onClick={() => this.clearForm()}
                        >
                            Clear form
                        </PrimaryButton>
                        <PrimaryButton
                            className="button submit"
                            type="submit"
                        >
                            Create Teams
                        </PrimaryButton>
                    </div>
                </form>
                <div id="results">
                    {this.state.results}
                </div>
            </div >

        );
    }
}