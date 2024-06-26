"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { fetchBlogById } from "../../../utils/blogAPI";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
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
    </>
  );
}
