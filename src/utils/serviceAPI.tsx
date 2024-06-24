import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export interface Service {
  id: number;
  description: string;
  image: string;
  name: string;
}

interface FetchServicesResponse {
  services: Service[];
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${HASURA_API_BASE_URL}/services`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data: FetchServicesResponse = await response.json();
  console.log("Fetched services data:", data); // Log the data for debugging
  return data.services; // Return the services array
}

export async function insertService(newService: { description: string; image: string; name: string }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/service/insert`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newService),
  });

  if (!response.ok) {
    throw new Error("Failed to insert service");
  }

  const data = await response.json();
  console.log("Inserted service data:", data); // Log the data for debugging
  return data;
}

export async function updateService(id: number, updatedService: { description?: string; image?: string; name?: string }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/service/update/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedService),
  });

  if (!response.ok) {
    throw new Error("Failed to update service");
  }

  const data = await response.json();
  console.log("Updated service data:", data); // Log the data for debugging
  return data;
}

export async function deleteService(id: number): Promise<void> {
  const response = await fetch(`${HASURA_API_BASE_URL}/service/delete/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  console.log(`Deleted service with id: ${id}`); // Log the deleted service id for debugging
}
