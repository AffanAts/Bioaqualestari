"use client"; // Ensure this is at the top

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchBlogById } from "../../utils/blogAPI";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
}

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const getBlog = async () => {
        try {
          const blogData: Blog = await fetchBlogById(id as string);
          setBlog(blogData);
        } catch (error) {
          setError((error as Error).message);
        }
      };

      getBlog();
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">
        By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
      </p>
      <img className="w-full h-64 object-cover mb-4" src={blog.image} alt={blog.title} />
      <p className="text-lg">{blog.description}</p>
    </div>
  );
}
