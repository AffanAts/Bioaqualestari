"use client"; // Ensure this is at the top

import { insertComment } from "@/utils/commentAPI";
import React, { useEffect, useState } from "react";
import Link from "../../../../node_modules/next/link";
import { fetchBlogById } from "../../../utils/blogAPI";
import CommentSection from "./commentSection";

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

export default function BlogDetails({ params }: { params: { blogId: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center">
      </div>
      <div key={blog.id} className="container text-black px-60">
      <Link href="/">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >Back</button>
      </Link>
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">
          By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <img className="w-full h-70 object-cover mb-4" src={blog.image} alt={blog.title} />
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
      </div>
      <div className="px-20">
        <h1 className="text-black text-3xl font-bold">Related Contents</h1>
      </div>
      <CommentSection blog={blog} setBlog={setBlog} />
    </>
  );
}
