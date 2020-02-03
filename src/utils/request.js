import axios from 'axios';
import {KeycloakService} from './keycloak.service';

const key = new KeycloakService();

export async function getConfig () {
  const token = await key.getToken();
  const config = {
    baseURL: 'https://vinirmititech.com/api',
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    }
  }
  return new Promise( (resolve) => resolve(config));
};

// using different library of aoxis
export default async function request() {
  // it may need to get token every time so keeping it inside function here ..
  const conf = await getConfig();
  const req =  axios.create(conf);
  return new Promise( (resolve) => resolve(req));
}

export const request2 = axios.create({
  baseURL: 'https://vinirmititech.com/api',
  timeout: 1000
});
