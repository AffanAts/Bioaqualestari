// src/utils/clientAPI.ts
import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export interface Client {
  id: number;
  name: string;
  image: string;
}

interface FetchClientsResponse {
  client: Client[];
}

export async function fetchClients(): Promise<Client[]> {
  const response = await fetch(`${HASURA_API_BASE_URL}/clients`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }

  const data: FetchClientsResponse = await response.json();
  console.log("Fetched clients data:", data); // Log the data for debugging
  return data.client; // Return the clients array
}
