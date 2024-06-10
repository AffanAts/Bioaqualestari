import axios from 'axios';

const HASURA_API_BASE_URL = 'https://dehaexport.hasura.app/api/rest';

export const axiosInstance = axios.create({
  baseURL: HASURA_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-hasura-admin-secret': 'Q2dkJ401j1PmbjPcqedy4uwc2hgwzTMaUZ4zgWJqbUfvwcnzWaswS4rISFy50T68', // Gantilah dengan admin secret Anda
  },
});
