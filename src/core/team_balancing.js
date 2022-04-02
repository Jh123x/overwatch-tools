export function player_balance_teams(players) {
  /// Balancing the number of players in an in-house game
  /// @returns {Array} containing the players in the team
  if (players.length <= 1) {
    return [players, []];
  }
  if (players.length === 2) {
    return [[players[0]], [players[1]]];
  }

  // TODO: Implement a better algorithm for balancing teams
  return [[], []];
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
