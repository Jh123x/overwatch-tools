import React from "react";
import { player_matching } from "../core/team_balancing";
import styles from "./app.module.css";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { PrimaryInput } from "../components/Input";
import { PrimaryButton } from "../components/Button";
import { player_lookup } from "../core/api";
import style from "./app.module.css";

export const PlayerMatchmake = () => {
  const [state, setState] = React.useState({
    player: {
      name: "",
      tank: "",
      damage: "",
      support: "",
      battleTag: "",
    },
    curr_players: [],
    result: [],
    max_players: false,
  });

  const handle_lookup = async (event) => {
    const battle_tag = document.getElementById("battleTag").value;
    const name = document.getElementById("name").value;
    const response = await player_lookup(name, battle_tag);
    for (let i = 0; i < response.ratings.length; ++i) {
      const role = response.ratings[i].role;
      const rating = response.ratings[i].level;
      document.getElementById(role).value = rating;
    }
    handle_change(event);
  };

  const clear_form = () => {
    const ids = ["name", "battleTag", "tank", "damage", "support"];
    for (let i = 0; i < ids.length; ++i) {
      document.getElementById(ids[i]).value = "";
    }
  };

  const handle_change = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const tank = document.getElementById("tank").value;
    const damage = document.getElementById("damage").value;
    const support = document.getElementById("support").value;
    const battleTag = document.getElementById("battleTag").value;
    setState({
      ...state,
      player: {
        name: name,
        tank: tank,
        damage: damage,
        support: support,
        battleTag: battleTag,
      },
    });
  };

  const handle_add = (event) => {
    event.preventDefault();
    const player = state.player;
    if (
      player.support === "" ||
      player.damage === "" ||
      player.tank === "" ||
      player.battleTag === ""
    ) {
      alert("Please fill out all fields");
      return;
    }
    player.name = player.name + "#" + player.battleTag;

    const new_players = [...state.curr_players, player];
    setState({
      ...state,
      curr_players: new_players,
      player: {
        name: "",
        tank: -1,
        damage: -1,
        support: -1,
        battleTag: -1,
      },
    });
    clear_form();
  };

  const handle_submit = (event) => {
    event.preventDefault();
    const players = state.curr_players;
    const results = player_matching(players).splice(1);
    results.sort((a, b) => a.avg_rank - b.avg_rank);
    setState({ ...state, result: results });
  };

  const generate_player_table = (players, index_key) => {
    const result = [];
    for (let i = 0; i < 2; i++) {
      const player = players[i] ?? { name: "" };
      result.push(
        <TableCell
          className={styles.text_color}
          key={index_key + player.name + i}
        >
          {player.name}
        </TableCell>
      );
    }
    return result;
  };

  const generate_rows = () => {
    let groups = state.result;
    if (state.max_players) {
      const max_p = Math.max(...groups.map((p) => p.players));
      groups = groups.filter((p) => p.players === max_p);
    }
    return groups.map((player_group, index) => {
      return (
        <TableRow key={index}>
          {[
            ...generate_player_table(player_group.tanks, index + "tank"),
            ...generate_player_table(player_group.damage, index + "dps"),
            ...generate_player_table(player_group.support, index + "sp"),
            <TableCell className={styles.text_color} key={"avg_rank" + index}>
              {player_group.avg_rank}
            </TableCell>,
          ]}
        </TableRow>
      );
    });
  };

  const generate_table = () => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.text_color} key="tank1">
              Tank 1
            </TableCell>
            <TableCell className={styles.text_color} key="tank2">
              Tank 2
            </TableCell>
            <TableCell className={styles.text_color} key="dps1">
              Damage 1
            </TableCell>
            <TableCell className={styles.text_color} key="dps2">
              Damage 2
            </TableCell>
            <TableCell className={styles.text_color} key="sp1">
              Support 1
            </TableCell>
            <TableCell className={styles.text_color} key="sp2">
              Support 2
            </TableCell>
            <TableCell className={styles.text_color} key="avg">
              Average Rating
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{generate_rows()}</TableBody>
      </Table>
    );
  };

  const remove_player_at_index = (index) => {
    const new_players = [...state.curr_players];
    new_players.splice(index, 1);
    setState({ ...state, curr_players: new_players });
  };

  const generate_form_table = () => {
    const curr = state.curr_players;
    const result = [];
    for (let i = 0; i < curr.length; i++) {
      const player = curr[i];
      result.push(
        <TableRow key={i}>
          <TableCell className={styles.text_color} key={"name" + i}>
            {player.name}
          </TableCell>
          <TableCell className={styles.text_color} key={"tank_rating" + i}>
            {player.tank}
          </TableCell>
          <TableCell className={styles.text_color} key={"dps_rating" + i}>
            {player.damage}
          </TableCell>
          <TableCell className={styles.text_color} key={"sp_rating" + i}>
            {player.support}
          </TableCell>
          <TableCell key={"actions" + i}>
            <PrimaryButton onClick={() => remove_player_at_index(i)}>
              Remove
            </PrimaryButton>
          </TableCell>
        </TableRow>
      );
    }
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.text_color}>Name</TableCell>
            <TableCell className={styles.text_color}>Tank Rating</TableCell>
            <TableCell className={styles.text_color}>Damage Rating</TableCell>
            <TableCell className={styles.text_color}>Support Rating</TableCell>
            <TableCell className={styles.text_color}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{result}</TableBody>
      </Table>
    );
  };

  return (
    <div className={style.App}>
      <div className={style.header}>
        <h1>Match Page</h1>
        <p>
          Have a bunch of friends you want to play but don't know who can play
          with each other? Use this to find out what teams you can from a list
          of players.
        </p>
        {state.result.length > 0 ? generate_table() : null}
        <br />
        {state.curr_players.length > 0 ? generate_form_table() : null}
        <form>
          <PrimaryInput
            type="text"
            id="name"
            placeholder="Player Name"
            onChange={handle_change}
          />
          <PrimaryInput
            type="number"
            id="battleTag"
            placeholder="Battle Tag"
            onChange={handle_change}
          />
          <PrimaryInput
            type="number"
            id="tank"
            placeholder="Tank Rating"
            onChange={handle_change}
          />
          <PrimaryInput
            type="number"
            id="damage"
            placeholder="Damage Rating"
            onChange={handle_change}
          />
          <PrimaryInput
            type="number"
            id="support"
            placeholder="Support Rating"
            onChange={handle_change}
          />
          <br />
          <PrimaryButton
            type="button"
            className="btn lookup"
            onClick={handle_lookup}
          >
            Lookup player
          </PrimaryButton>
          <PrimaryButton type="button" className="btn add" onClick={handle_add}>
            Add Player
          </PrimaryButton>
          <br />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(event) =>
                  setState({ ...state, max_players: event.target.checked })
                }
              />
            }
            label="Maximise number of players"
          />
          <br />
          <PrimaryButton
            type="submit"
            className="btn submit"
            onClick={handle_submit}
          >
            Form teams
          </PrimaryButton>
          <PrimaryButton
            type="submit"
            className="btn submit"
            onClick={(e) => {
              e.preventDefault();
              setState({ ...state, result: [] });
            }}
          >
            Clear Teams
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};
