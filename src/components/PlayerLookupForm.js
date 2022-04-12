import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styles from './PlayerLookupForm.module.css';
import { player_lookup } from '../core/api';
import { PrimaryButton } from './Button';
import { PrimaryInput } from './Input';


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

  generateRankURL(rating) {
    let curr = 0;
    if (rating < 1500) {
      curr = 'Bronze';
    }
    else if (rating < 2000) {
      curr = 'Silver';
    }
    else if (rating < 2500) {
      curr = 'Gold';
    }
    else if (rating < 3000) {
      curr = 'Platinum';
    }
    else if (rating < 3500) {
      curr = 'Diamond';
    }
    else if (rating < 4000) {
      curr = 'Master';
    }
    else if (rating < 4500) {
      curr = 'Grandmaster';
    }
    return `https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-${curr}Tier.png`
  }


  wrap_table(key, iconUrl, rating, rankUrl, role) {
    const icon = iconUrl.length > 0 ? <img src={iconUrl} alt={role} className={styles.icons} width="30px" /> : '';
    if (rankUrl.length === 0) {
      rankUrl = this.generateRankURL(rating);
    }
    const rank = <img src={rankUrl} alt={role} className={styles.icons} width="30px" />;
    return <TableRow
      key={key}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell className={styles.text_color}>
        {icon}
        {this.Capitalize(role)}{" "}
      </TableCell>
      <TableCell className={styles.text_color}>
        {rank}
        {rating}
      </TableCell>
    </TableRow>
  }

  render_response(response) {
    if (response.error === 'Player not found!' || response.status === 404) {
      return 'Player is not found!';
    }
    if (response.private) {
      return 'Player Account is private! The Profile must be public to use this feature.';
    }

    let table = [this.wrap_table(4, '', response.rating, '', 'Overall')];
    for (let i = 0; i < response.ratings.length; ++i) {
      const role = response.ratings[i].role;
      const iconUrl = response.ratings[i].roleIcon;
      const rankUrl = response.ratings[i].rankIcon;
      const rating = response.ratings[i].level;
      table.push(
        this.wrap_table(i, iconUrl, rating, rankUrl, role)
      );
    }
    return (
      <div>
        <h1>{this.state.playerName}</h1>
        <p>Level: {response.level + response.prestige * 100}</p>
        <h2>Rank:</h2>
        <TableContainer>
          <Table aria-label="results table">
            <TableHead>
              <TableRow>
                <TableCell className={styles.text_color}>
                  Role
                </TableCell>
                <TableCell className={styles.text_color}>
                  Rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </TableContainer>
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
          <br />
          <PrimaryInput
            type='text'
            name='playerName'
            label="Player Name"
            onChange={this.handleChange}
          />
          <br />
          <PrimaryInput
            type='number'
            name='battleTag'
            label="Battle Tag"
            onChange={this.handleChange}
          />
          <br />
          <PrimaryButton
            type="submit"
          >
            Search
          </PrimaryButton>
        </form>
        <br />
        <div id='result'>{this.state.result}</div>
      </div>
    );
  }
}
