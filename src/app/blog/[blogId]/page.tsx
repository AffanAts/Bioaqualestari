"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { fetchBlogById } from "../../../utils/blogAPI";
import { insertComment } from "../../../utils/commentAPI";

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
  comments: Comment[]; // Menambahkan properti comments
}

export default function BlogDetails({ params }: { params: { blogId: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    if (params.blogId) {
      const getBlog = async () => {
        try {
          const blogData = await fetchBlogById(params.blogId);
          setBlog(blogData);
        } catch (error) {
          setError((error as Error).message);
        }
      };

      getBlog();
    }
  }, [params.blogId]);

  const handleInsertComment = async () => {
    if (newComment.trim() === "" || newName.trim() === "") {
      alert("Comment and Name cannot be empty");
      return;
    }

    try {
      const commentData = {
        comment: newComment,
        blog_id: parseInt(params.blogId),
        name: newName,
      };
      const insertedComment = await insertComment(commentData);

      // Tambahkan properti created_at jika belum ada, gunakan Date sekarang
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
      setError((error as Error).message);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="text-black text-center py-12">
        <h1 className="font-extrabold text-4xl mb-8">Blog</h1>
        <p className="mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?
        </p>
      </div>
      <div key={blog.id} className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">
          By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <img className="w-full h-64 object-cover mb-4" src={blog.image} alt={blog.title} />
        <p className="text-lg">{blog.description}</p>
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <p className="text-gray-600 mb-1"><strong>{comment.name}</strong> on {new Date(comment.created_at).toLocaleString()}</p>
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
          <button
            className="bg-blue-500 text-white px-4 py-2"
            onClick={handleInsertComment}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
