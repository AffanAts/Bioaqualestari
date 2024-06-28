"use client"; // Ensure this is at the top

import { insertComment } from "@/utils/commentAPI";
import React, { useState } from "react";

interface Comment {
  id: number;
  comment: string;
  blog_id: number;
  name: string;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
  comments: Comment[];
}

interface CommentSectionProps {
  blog: Blog;
  setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
}

export default function CommentSection({ blog, setBlog }: CommentSectionProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  const handleInsertComment = async () => {
    if (newComment.trim() === "" || newName.trim() === "") {
      alert("Comment and Name cannot be empty");
      return;
    }

    try {
      const commentData = {
        comment: newComment,
        blog_id: blog.id,
        name: newName,
      };
      const insertedComment = await insertComment(commentData);

      if (!insertedComment.created_at) {
        insertedComment.created_at = new Date().toISOString();
      }

      setBlog((prevBlog) => {
        if (prevBlog) {
          return { ...prevBlog, comments: [...prevBlog.comments, insertedComment] };
        }
        return prevBlog;
      });
      setNewComment("");
      setNewName("");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="container p-4 text-black px-20">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {blog.comments.length > 0 ? (
        blog.comments.map((comment) => (
          <div key={comment.id} className="mb-4 text-black">
            <p className="mb-1">
              <strong>{comment.name}</strong> on {new Date(comment.created_at).toLocaleString()}
            </p>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Add a Comment</h3>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Your Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Your Comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleInsertComment}>
          Submit
        </button>
      </div>
    </div>
  );
}
