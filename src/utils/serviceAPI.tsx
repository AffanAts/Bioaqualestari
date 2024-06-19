// src/utils/productAPI.ts
import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export async function fetchServices() {
  const response = await fetch(`${HASURA_API_BASE_URL}/services`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  console.log("Fetched products data:", data); // Log the data for debugging
  return data.services; // Return the products array
}

// export async function fetchClients() {
//   const response = await fetch(`${HASURA_API_BASE_URL}/clients`, { headers });

//   if (!response.ok) {
//     throw new Error("Failed to fetch clients");
//   }

//   const data = await response.json();
//   console.log("Fetched clients data:", data); // Log the data for debugging
//   return data.clients; // Return the products array
// }
