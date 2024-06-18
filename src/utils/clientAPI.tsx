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

export async function insertClient(newClient: { name: string; image: string }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/client/insert`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newClient),
  });

  if (!response.ok) {
    throw new Error("Failed to insert client");
  }

  const data = await response.json();
  console.log("Inserted client data:", data); // Log the data for debugging
  return data;
}


export async function updateClient(id: number, updatedClient: { name: string; image: string }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/client/update/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedClient),
  });

  if (!response.ok) {
    throw new Error("Failed to update client");
  }

  const data = await response.json();
  console.log("Updated client data:", data); // Log the data for debugging
  return data;
}

export async function deleteClient(id: number): Promise<void> {
  const response = await fetch(`${HASURA_API_BASE_URL}/client/delete/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete client");
  }

  console.log(`Deleted client with id: ${id}`); // Log the deleted client id for debugging
}


