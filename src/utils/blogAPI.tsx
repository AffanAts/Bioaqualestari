import { ReactNode } from "react";
import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export interface Blog {
  [x: string]: ReactNode;
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
}

interface FetchBlogsResponse {
  blog: Blog[];
}

export async function fetchBlogs(): Promise<Blog[]> {
  const response = await fetch(`${HASURA_API_BASE_URL}/blogs`, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data: FetchBlogsResponse = await response.json();
  console.log("Fetched blogs data:", data); // Log the data for debugging
  return data.blog; // Return the blogs array
}

<<<<<<< HEAD
export const fetchBlogById = async (id: string): Promise<Blog> => {
  const response = await fetch(`/api/blogs/${id}`);
  const data = await response.json();
  return data;
};

export async function insertBlog(newBlog: { title: string; image: string; description: string; created_at: string; author: string; }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/api/rest/blog/insert`, {
=======
export async function insertBlog(newBlog: { title: string; image: string; description: string; author: string; }) {
  console.log("Sending data to the server:", newBlog); // Log the data to be sent
  const response = await fetch(`${HASURA_API_BASE_URL}/blog/insert`, {
>>>>>>> 369876e8dbae849aa183ae948fb3fa296df4fb46
    method: "POST",
    headers: headers,
    body: JSON.stringify(newBlog),
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error("Failed to insert blog:", errorResponse); // Log the error response for debugging
    throw new Error("Failed to insert blog");
  }

  const data = await response.json();
  console.log("Inserted blog data:", data); // Log the data for debugging
  return data;
}

export async function updateBlog(id: number, updatedBlog: { title?: string; image?: string; description?: string; author?: string; }) {
  const response = await fetch(`${HASURA_API_BASE_URL}/blog/update/${id}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(updatedBlog),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  const data = await response.json();
  console.log("Updated blog data:", data); // Log the data for debugging
  return data;
}

export async function deleteBlog(id: number): Promise<void> {
  const response = await fetch(`${HASURA_API_BASE_URL}/blog/delete/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  console.log(`Deleted blog with id: ${id}`); // Log the deleted blog id for debugging
}
