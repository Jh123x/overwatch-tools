import { player_balance_teams, player_matching, PlayerGroup, calculate_player_average_rank } from './team_balancing';

const public_player = {
  competitiveStats: {
    awards: {
      cards: 4,
      medals: 69,
      medalsBronze: 27,
      medalsSilver: 26,
      medalsGold: 16,
    },
    games: { played: 32, won: 10 },
  },
  endorsement: 2,
  endorsementIcon:
    'https://static.playoverwatch.com/svg/icons/endorsement-frames-3c9292c49d.svg#_2',
  gamesWon: 3035,
  icon: '',
  level: 34,
  levelIcon:
    'https://d15f34w2p8l1cc.cloudfront.net/overwatch/624461e537900ce98e3178d1a298cba4830c14f6a81a8b36319da6273bed255a.png',
  name: 'Krusher98#1666',
  prestige: 11,
  prestigeIcon:
    'https://d15f34w2p8l1cc.cloudfront.net/overwatch/9b838b75065248ec14360723e4caf523239128ff8c13bda36cfd0b59ef501c1e.png',
  private: false,
  quickPlayStats: {
    awards: {
      cards: 721,
      medals: 7309,
      medalsBronze: 2507,
      medalsSilver: 2517,
      medalsGold: 2284,
    },
    games: { played: 3000, won: 1498 },
  },
  rating: 1636,
  ratingIcon:
    'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-SilverTier.png',
  ratings: [
    {
      level: 2342,
      role: 'tank',
      roleIcon:
        'https://static.playoverwatch.com/img/pages/career/icon-tank-8a52daaf01.png',
      rankIcon:
        'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-GoldTier.png',
    },
    {
      level: 931,
      role: 'damage',
      roleIcon:
        'https://static.playoverwatch.com/img/pages/career/icon-offense-6267addd52.png',
      rankIcon:
        'https://d1u1mce87gyfbn.cloudfront.net/game/rank-icons/rank-BronzeTier.png',
    },
  ],
};
const private_player = {
  competitiveStats: {},
  endorsement: 2,
  endorsementIcon:
    'https://static.playoverwatch.com/svg/icons/endorsement-frames-3c9292c49d.svg#_2',
  gamesWon: 0,
  icon: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/62ebbc85416132885bba0289696a08af02f98e9b2518cde1956884fba905d859.png',
  level: 74,
  levelIcon:
    'https://d15f34w2p8l1cc.cloudfront.net/overwatch/45cc69ca29f3981fa085b5337d2303a4eb555853daae1c29351b7ba46b27bbcd.png',
  name: 'Kappa123#21457',
  prestige: 4,
  prestigeIcon:
    'https://d15f34w2p8l1cc.cloudfront.net/overwatch/bc80149bbd78d2f940984712485bce23ddaa6f2bd0edd1c0494464ef55251eef.png',
  private: true,
  quickPlayStats: {},
  rating: 0,
  ratingIcon: '',
  ratings: null,
};

function create_player_profile(name, tag, rating) {
  return {
    name: name,
    battleTag: tag,
    overall: rating,
  };
}

function create_player(name, tank, dps, support) {
  return {
    name: name,
    tank: tank,
    damage: dps,
    support: support,
  }
}


//Player avg test
test("Check player Avg Tank", () => {
  const player = create_player("Kappa123#21457", 2, 2, 2);
  const player2 = create_player("Krusher98#1666", 4, 4, 4);
  const avg_rank = calculate_player_average_rank([player, player2], [], []);
  expect(avg_rank).toBe(3);
})

test("Check player Avg Tank / Dps", () => {
  const player = create_player("Kappa123#21457", 2, 2, 2);
  const player2 = create_player("Krusher98#1666", 4, 4, 4);
  const avg_rank = calculate_player_average_rank([player2], [player], []);
  expect(avg_rank).toBe(3);
})

test("Check player Avg DPS / Support", () => {
  const player = create_player("Kappa123#21457", 2, 2, 2);
  const player2 = create_player("Krusher98#1666", 4, 4, 4);
  const avg_rank = calculate_player_average_rank([], [player2], [player]);
  expect(avg_rank).toBe(3);
})

// Player Group test
test("Check full player Group", () => {
  const player = create_player("Kappa123#21457", 1, 2, 3);
  const player2 = create_player("Krusher98#1666", 2, 4, 5);
  const player3 = create_player("Krusher98#1666", 6, 3, 7);
  const player4 = create_player("Krusher98#1666", 9, 4, 8);
  const player5 = create_player("Krusher98#1666", 10, 55, 5);
  const player6 = create_player("Krusher98#1666", 63, 43, 6);
  const grp = new PlayerGroup([player, player2], [player3, player4], [player5, player6]);
  expect(grp.avg_rank)
    .toEqual(21 / 6);

  expect(grp.min_rank)
    .toEqual(1);

  expect(grp.max_rank)
    .toEqual(6);

  expect(grp.can_be_added(player))
    .toBe(false);
});

test("Check partial player group", () => {
  const player1 = create_player("Kappa123#21457", 1000, 2000, 3000);
  const player2 = create_player("Krusher98#1666", 2000, 4000, 5000);
  const grp = new PlayerGroup([player1], [player2], []);
  expect(grp.avg_rank)
    .toEqual(2500);

  expect(grp.min_rank)
    .toEqual(1000);

  expect(grp.max_rank)
    .toEqual(4000);
})

test("Check empty player group", () => {
  const grp = new PlayerGroup([], [], []);
  expect(grp.avg_rank)
    .toEqual(-1);

  expect(grp.min_rank)
    .toEqual(-1);

  expect(grp.max_rank)
    .toEqual(-1);
})



// Player Matching tests
test('Player match Empty players', () => {
  expect(player_matching([])).toEqual([new PlayerGroup([], [], [])]);
});

test('Player match 1 player', () => {
  const player = create_player('Kappa123#21457', 0, 0, 0);
  expect(player_matching([player]))
    .toEqual(
      [
        new PlayerGroup([], [], []),
        new PlayerGroup([player], [], []),
        new PlayerGroup([], [player], []),
        new PlayerGroup([], [], [player])
      ]
    );
})

test('Player match 1 / 2', () => {
  const player = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 1001, 1001, 1001);
  const result = player_matching([player, player2]);
  expect(result)
    .toEqual(
      [
        new PlayerGroup([], [], []),
        new PlayerGroup([player], [], []),
        new PlayerGroup([], [player], []),
        new PlayerGroup([], [], [player]),
        new PlayerGroup([player2], [], []),
        new PlayerGroup([], [player2], []),
        new PlayerGroup([], [], [player2])
      ]
    );
})

test('Match only 2 / 3', () => {
  const player = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 2001, 2001, 2001);
  const player3 = create_player('Krusher98#1667', 500, 500, 500);
  const result = new Set(player_matching([player, player2, player3]));
  expect(result)
    .toEqual(
      new Set([
        new PlayerGroup([], [], []),
        new PlayerGroup([player], [], []),
        new PlayerGroup([], [player], []),
        new PlayerGroup([], [], [player]),
        new PlayerGroup([player2], [], []),
        new PlayerGroup([], [player2], []),
        new PlayerGroup([], [], [player2]),
        new PlayerGroup([player3], [], []),
        new PlayerGroup([], [player3], []),
        new PlayerGroup([], [], [player3]),
        new PlayerGroup([player, player3], [], []),
        new PlayerGroup([player], [player3], []),
        new PlayerGroup([player], [], [player3]),
        new PlayerGroup([player3], [player], []),
        new PlayerGroup([player3], [], [player]),
        new PlayerGroup([], [player, player3], []),
        new PlayerGroup([], [player], [player3]),
        new PlayerGroup([], [], [player, player3]),
        new PlayerGroup([], [player3], [player]),
      ])
    );
})

test('Player match 2 players', () => {
  const player1 = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 0, 0, 0);
  expect(player_matching([player1, player2])).toHaveLength(4 ** 2);
})

test('Player match 3 players', () => {
  const player1 = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 0, 0, 0);
  const player3 = create_player('Kappa123#214578', 0, 0, 0);
  expect(player_matching([player1, player2, player3])).toHaveLength(4 ** 3);
})

test('Player match 4 players', () => {
  const player1 = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 0, 0, 0);
  const player3 = create_player('Kappa123#214578', 0, 0, 0);
  const player4 = create_player('Krusher98#16666', 0, 0, 0);
  expect(player_matching([player1, player2, player3, player4])).toHaveLength(4 ** 4);
})

test('Player match 5 players', () => {
  const player1 = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 0, 0, 0);
  const player3 = create_player('Kappa123#214578', 0, 0, 0);
  const player4 = create_player('Krusher98#16666', 0, 0, 0);
  const player5 = create_player('Kappa123#2145789', 0, 0, 0);
  expect(player_matching([player1, player2, player3, player4, player5])).toHaveLength(4 ** 5);
});

test('Player match 6 players', () => {
  const player1 = create_player('Kappa123#21457', 0, 0, 0);
  const player2 = create_player('Krusher98#1666', 0, 0, 0);
  const player3 = create_player('Kappa123#214578', 0, 0, 0);
  const player4 = create_player('Krusher98#16666', 0, 0, 0);
  const player5 = create_player('Kappa123#2145789', 0, 0, 0);
  const player6 = create_player('Krusher98#166666', 0, 0, 0);
  expect(player_matching([player1, player2, player3, player4, player5, player6])).toHaveLength(4 ** 6);
});


// Player Balance teams tests
test('Player balance Empty Players', () => {
  expect(player_balance_teams([])).toEqual([[], []]);
});

test('Player balance One Player', () => {
  expect(player_balance_teams([public_player])).toEqual([[public_player], []]);
});

test('Player balance Two Players', () => {
  expect(player_balance_teams([public_player, public_player])).toEqual([
    [public_player],
    [public_player],
  ]);
});

test('Player balance 4 players', () => {
  let players = [];
  for (let i = 0; i < 4; i++) {
    players.push(create_player_profile(`Player${i}`, `#${i}`, i));
  }
  let [team1, team2] = player_balance_teams(players);
  expect(new Set(team1.map(player => player.name))).toEqual(new Set(['Player0', 'Player3']));
  expect(new Set(team2.map(player => player.name))).toEqual(new Set(['Player1', 'Player2']));
});

test('Player balance 5 players', () => {
  let players = [];
  for (let i = 0; i < 5; i++) {
    players.push(create_player_profile(`Player${i}`, `#${i}`, 10 - i));
  }
  let [team1, team2] = player_balance_teams(players);
  expect(new Set(team1.map(p => p.name))).toEqual(new Set(['Player0', 'Player3', 'Player4']));
  expect(new Set(team2.map(p => p.name))).toEqual(new Set(['Player1', 'Player2']));
})
