import { Button, Input } from '@mui/material';
import styles from './PlayerLookupForm.module.css';
import React from 'react';
import { player_lookup } from '../core/api';

export class PlayerLookupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      battleTag: '',
      playerName: '',
      result: 'Please key in a name and battletag to get started',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update_result = this.update_result.bind(this);
  }

  handleChange(event) {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  Capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render_response(response) {
    if (response.error === 'Player not found!' || response.status === 404) {
      return 'Player is not found!';
    }
    if (response.private) {
      return 'Player Account is private! The Profile must be public to use this feature.';
    }

    let table = [];
    for (let i = 0; i < response.ratings.length; ++i) {
      const role = response.ratings[i].role;
      const iconUrl = response.ratings[i].roleIcon;
      const rankUrl = response.ratings[i].rankIcon;
      const rating = response.ratings[i].level;
      table.push(
        <tr key={i}>
          <td>
            <img src={iconUrl} alt={role + ' icon'} />
            {this.Capitalize(role)}{' '}
          </td>
          <td>
            <div>
              <img src={rankUrl} alt={rating + ' rank'} />
              {rating}
            </div>
          </td>
        </tr>
      );
    }
    return (
      <div>
        <h1>{this.state.playerName}</h1>
        <p>Level: {response.level + response.prestige * 100}</p>
        <h2>Rank:</h2>
        <table>
          <tbody>
            <tr key='header'>
              <th>Role</th>
              <th>Rating</th>
            </tr>
            {table}
          </tbody>
        </table>
      </div>
    );
  }

  update_result() {
    this.setState({
      result: `Searching for ${this.state.playerName}#${this.state.battleTag}...`,
    });
    if (this.state.playerName === '' || this.state.battleTag === '') {
      this.setState({
        result: 'Please fill in all the fields',
      });
      return;
    }

    player_lookup(
      encodeURI(this.state.playerName),
      encodeURI(this.state.battleTag)
    )
      .then((response) => {
        this.setState({
          result: this.render_response(response),
        });
      })
      .catch((error) => {
        this.setState({ result: `${error}` });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.update_result();
  }

  render() {
    return (
      <div className='player-lookup-form'>
        <form onSubmit={this.handleSubmit}>
          <label>Player Name: </label>
          <br />
          <Input
            type='text'
            name='playerName'
            placeholder='Player Name'
            className={styles.input}
            onChange={this.handleChange}
          />
          <br />
          <label>Battle Tag: </label>
          <br />
          <Input
            type='number'
            name='battleTag'
            placeholder='Battle Tag'
            className={styles.input}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            id={styles.search_button}
          >
            Search
          </Button>
        </form>
        <br />
        <div id='result'>{this.state.result}</div>
      </div>
    );
  }
}
