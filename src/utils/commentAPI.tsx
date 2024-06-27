import { HASURA_API_BASE_URL, HASURA_ADMIN_SECRET } from "../config";

const headers = {
  "Content-Type": "application/json",
  "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
};

export interface Comment {
  id: number;
  comment: string;
  blog_id: number;
  name: string;
  created_at: string;
}

export async function insertComment(newComment: { comment: string; blog_id: number; name: string; }) {
  console.log("Sending data to the server:", newComment); // Log the data to be sent
  const response = await fetch(`${HASURA_API_BASE_URL}/comment/insert`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    const errorResponse = await response.text();
    console.error("Failed to insert comment:", errorResponse); // Log the error response for debugging
    throw new Error("Failed to insert comment");
  }

  const data = await response.json();
  console.log("Inserted comment data:", data); // Log the data for debugging
  return data;
}

export async function deleteComment(id: number): Promise<void> {
  const response = await fetch(`${HASURA_API_BASE_URL}/comment/delete/${id}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }

  console.log(`Deleted comment with id: ${id}`); // Log the deleted comment id for debugging
}
