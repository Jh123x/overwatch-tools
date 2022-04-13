import axios from 'axios';
import { constants } from './constants';

let cache = {};
let cache_counter = {};
let cache_queue = [];
const max_size = 100;

function generate_key(playerName, playerTag, region, device) {
  return playerName + "#" + playerTag + "#" + region + "#" + device;
}

function cleanup_cache() {
  while (cache.length > max_size) {
    const key = cache_queue.shift();
    --cache_counter[key];
    if (cache_counter[key] === 0) {
      delete cache[key];
    }
  }
}

export async function player_lookup(
  player_name,
  id,
  region = 'en-us',
  device = 'pc'
) {
  const key = generate_key(player_name, id, region, device);
  if (cache[key]) {
    cache_counter[key]++;
    cache_queue.push(key);
    return cache[key];
  }

  const response = axios
    .get(
      constants.api_url
        .replace('{player_name}', player_name)
        .replace('{id}', id)
        .replace('{region}', region)
        .replace('{device}', device)
    )
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });
  cache[key] = response;
  cache_queue.push(key);
  cache_counter[key] = cache_counter[key] ? cache_counter[key] + 1 : 1;
  cleanup_cache();
  return response;
}
