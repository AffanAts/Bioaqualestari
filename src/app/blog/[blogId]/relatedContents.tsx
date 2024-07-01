"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../../utils/blogAPI";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
}

const placeholderImage = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogData: Blog[] = await fetchBlogs();
        if (Array.isArray(blogData)) {
          setBlogs(blogData);
        } else {
          throw new Error("Blogs data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="">
      <div className="px-4 container p-4 mx-auto max-w-screen-lg">
        <h1 className="text-black text-3xl font-bold container pb-4 mx-auto max-w-screen-lg">Related Contents</h1>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex overflow-x-auto space-x-4">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog.id} className="flex-shrink-0 w-80">
              <Link href={`/blog/${blog.id}`}>
                <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <img className="w-full h-40 object-cover mb-4" src={isValidUrl(blog.image) ? blog.image : placeholderImage} alt={blog.title} />
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Created: {new Date(blog.created_at).toLocaleDateString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;
