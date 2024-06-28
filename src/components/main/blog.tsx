"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../utils/blogAPI";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  author: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const blogsData: Blog[] = await fetchBlogs();
        if (Array.isArray(blogsData)) {
          console.log(blogsData); // Check image paths
          setBlogs(blogsData);
        } else {
          throw new Error("Blogs data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getBlogs();
  }, []);

  const placeholderImage = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"; // URL gambar placeholder
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  const stripPTags = (html: string): string => {
    return html.replace(/<\/?p>/gi, "");
  };

  return (
    <>
      <div className="text-black text-center py-12">
        <h1 className="font-extrabold text-4xl mb-8">Blog</h1>
        <div className="mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {blogs.map((blog) => (
          <Link href={`/blog/${blog.id}`} key={blog.id}>
            <div className="block w-64 h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <img className="w-full h-40 object-cover" src={isValidUrl(blog.image) ? blog.image : placeholderImage} alt={blog.title} />
              <div className="mt-4">
                <div className="text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                <div className="text-gray-400">
                  {truncateText(stripPTags(blog.description), 30)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </>
  );
}
