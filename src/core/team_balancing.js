function rating_comparator_desc(a, b) {
  var keyA = parseInt(a.overall),
    keyB = parseInt(b.overall);
  // Compare the 2 rating
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
}


export function player_balance_teams(players) {
  /// Balancing the number of players in an in-house game
  /// Player contains {playerName, battleTag, overall}
  /// @returns {Array} containing the players in the team
  if (players.length <= 1) {
    return [players, []];
  }
  if (players.length === 2) {
    return [[players[0]], [players[1]]];
  }

  let team1 = [];
  let team2 = [];
  let team1_rating = 0;
  let team2_rating = 0;
  players.sort(rating_comparator_desc);
  for (let i = 0; i < players.length; ++i) {
    if (team1_rating <= team2_rating && team1.length < 6) {
      team1.push(players[i]);
      team1_rating += players[i].overall;
      continue
    }
    if (team2.length < 6) {
      team2.push(players[i]);
      team2_rating += players[i].overall;
    }
  }
  return [team1, team2];
}


export function calculate_player_average_rank(tank, healer, dps) {
  let num = tank.length + healer.length + dps.length;
  if (num === 0) {
    return Number('infinity');
  }
  let sum = 0;
  for (let i = 0; i < tank.length; ++i) {
    sum += tank[i].tank;
  }
  for (let i = 0; i < healer.length; ++i) {
    sum += healer[i].support;
  }
  for (let i = 0; i < dps.length; ++i) {
    sum += dps[i].damage;
  }
  return sum / num;
}

function can_player_match(rank1, rank2) {
  if (rank1 >= 4000 || rank2 >= 4000) {
    return abs(rank1 - rank2) <= 350;
  }
  if (rank1 >= 3500 || rank2 >= 3500) {
    return abs(rank1 - rank2) <= 500;
  }

  return abs(rank1 - rank2) <= 1000;
}

function get_min_max_rank(player_ranks) {
  let min = player_ranks[0];
  let max = player_ranks[0];
  for (let i = 1; i < player_ranks.length; ++i) {
    if (player_ranks[i] < min) {
      min = player_ranks[i];
    }
    if (player_ranks[i] > max) {
      max = player_ranks[i];
    }
  }
  return [min, max];
}

function abs(number) {
  return number > 0 ? number : -number;
}


// Export only for testing
export class PlayerGroup {
  constructor(tanks = [], damage = [], support = []) {
    this.tanks = tanks;
    this.damage = damage;
    this.support = support;
    this.players = tanks.length + damage.length + support.length;
    if (this.players <= 0) {
      this.avg_rank = -1;
      this.min_rank = -1;
      this.max_rank = -1;
    } else {
      this.avg_rank = calculate_player_average_rank(tanks, support, damage);
      const rank = [];
      for (let i = 0; i < tanks.length; ++i) {
        rank.push(tanks[i].tank);
      }
      for (let i = 0; i < support.length; ++i) {
        rank.push(support[i].support);
      }
      for (let i = 0; i < damage.length; ++i) {
        rank.push(damage[i].damage);
      }
      [this.min_rank, this.max_rank] = get_min_max_rank(rank);
    }
  }

  add_player(player, role) {
    const tanks = [...this.tanks];
    const damage = [...this.damage];
    const supports = [...this.support];
    if (role === 'tank') {
      tanks.push(player);
    }
    if (role === 'damage') {
      damage.push(player);
    }
    if (role === 'support') {
      supports.push(player);
    }
    return new PlayerGroup(tanks, damage, supports);
  }

  can_be_added(player_rank) {
    if (this.players >= 6) {
      return false;
    }
    if (this.avg_rank === -1) {
      return true;
    }
    return can_player_match(player_rank, this.min_rank) && can_player_match(player_rank, this.max_rank);
  }
}


// TODO: Improve efficiency of the algorithm.
export function player_matching(players, current_team = [new PlayerGroup([], [], [])]) {
  /// Matching the number of players in a competitive game.
  /// @returns Array of {Array} of players can play together.
  if (players.length <= 0) {
    return current_team;
  }
  const new_teams = [...current_team];
  const player = players[0];
  for (let i = 0; i < current_team.length; ++i) {
    const curr_grp = current_team[i];

    if (curr_grp.can_be_added(player.tank)) {
      new_teams.push(curr_grp.add_player(player, 'tank'));
    }

    if (curr_grp.can_be_added(player.damage)) {
      new_teams.push(curr_grp.add_player(player, 'damage'));
    }

    if (curr_grp.can_be_added(player.support)) {
      new_teams.push(curr_grp.add_player(player, 'support'));
    }
  }

  return player_matching(players.slice(1), new_teams);
}
