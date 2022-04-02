import { player_balance_teams, player_matching } from './team_balancing';

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

// Player Matching tests
test('Player match Empty players', () => {
  expect(player_matching([])).toEqual([]);
});

test('Player match One Player', () => {
  expect(player_matching([public_player], 1, 1600)).toEqual([public_player]);
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
