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

// TODO: Add algorithm to take into account roles.

export function player_matching(players, no_of_players, target_rank) {
  /// Matching the number of players in a competitive game for a target rank.
  /// @returns {Array} of players can play together.
  if (players.length <= 1) {
    return players;
  }

  // Todo implement player matching logic
  return [];
}
