/**
 * @jest-environment node
 */

import { player_lookup } from './api';

test('Player lookup API success test', async () => {
  let result = await player_lookup('Krusher98', '1666');
  expect(result).toBeDefined();
  expect(result.name).toEqual('Krusher98#1666');
});

test('Player lookup private', async () => {
  let result = await player_lookup('Kappa123', '21457');
  expect(result).toBeDefined();
  expect(result.private).toEqual(true);
});

test('Player not found test', async () => {
  await player_lookup('krusher98', '12345').catch(function (error) {
    expect(error.response.status).toEqual(404);
  });
});
