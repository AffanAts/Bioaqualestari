import { ReactNode } from "react";
import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export interface Project {
  [x: string]: ReactNode;
  id: number;
  title: string;
  image: string;
  description: string;
}
 
interface FetchProjectsResponse {
  project: Project[];
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${HASURA_API_BASE_URL}/projects`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: FetchProjectsResponse = await response.json();
  console.log("Fetched projects data:", data); // Log the data for debugging
  return data.project; // Return the projects array
}

export async function insertProject(newProject: { title: string; image: string; description: string; }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/project/insert`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newProject),
  });

  if (!response.ok) {
    throw new Error("Failed to insert project");
  }

  const data = await response.json();
  console.log("Inserted project data:", data); // Log the data for debugging
  return data;
}


export async function updateProject(id: number, updatedProject: { title?: string; image?: string; description?: string; }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/project/update/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedProject),
  });

  if (!response.ok) {
    throw new Error("Failed to update project");
  }

  const data = await response.json();
  console.log("Updated project data:", data); // Log the data for debugging
  return data;
}


export async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`${HASURA_API_BASE_URL}/project/delete/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }

  console.log(`Deleted project with id: ${id}`); // Log the deleted project id for debugging
}


