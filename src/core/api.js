import axios from 'axios';
import { constants } from './constants';

export async function player_lookup(
  player_name,
  id,
  region = 'en-us',
  device = 'pc'
) {
  return axios
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
}
