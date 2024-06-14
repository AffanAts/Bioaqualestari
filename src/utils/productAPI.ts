// src/utils/productAPI.ts
import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from '../config';

const headers = {
  'Content-Type': 'application/json',
  'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
};

export async function fetchProducts() {
  const response = await fetch(`${HASURA_API_BASE_URL}/getAllProducts`, { headers });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  console.log('Fetched products data:', data); 
  return data.products; 
}
