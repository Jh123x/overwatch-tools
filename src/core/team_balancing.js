export function player_balance_teams(players) {
  /// Balancing the number of players in an in-house game
  /// Player contains {playerName, battleTag, tank, support, damage}
  /// @returns {Array} containing the players in the team
  if (players.length <= 1) {
    return [players, []];
  }
  if (players.length === 2) {
    return [[players[0]], [players[1]]];
  }

  let team1 = [];
  let team2 = [];
  // let team1_score = 0;
  // let team2_score = 0;
  // for (let i = 0; i < players.length || team1.length + team2.length == 12 ; i++) {
  //   let player = players[i];
  // }
  return [team1, team2];
}

export function player_matching(players, no_of_players, target_rank) {
  /// Matching the number of players in a competitive game for a target rank.
  /// @returns {Array} of players can play together.
  if (players.length <= 1) {
    return players;
  }

  // Todo implement player matching logic
  return [];
}
