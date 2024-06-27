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

  return (
    <>
      <div className="text-black text-center py-12">
        <h1 className="font-extrabold text-4xl mb-8">Blog</h1>
        <p className="mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?
        </p>
      </div>
      <div className="flex flex-wrap justify-around px-10">
        <div className="w-full lg:w-7/12 mb-8">
          {blogs.length > 0 && (
            <Link href={`/blog/${blogs[0].id}`}>
              <div>
                <img className="w-full h-64 object-cover mb-4" src={isValidUrl(blogs[0].image) ? blogs[0].image : placeholderImage} alt={blogs[0].title} />
                <p className="text-gray-500 mb-1">{new Date(blogs[0].created_at).toLocaleDateString()}</p>
                <h2 className="text-3xl font-bold text-black mb-4">{blogs[0].title}</h2>
                <p className="text-black">
                  <div dangerouslySetInnerHTML={{ __html: blogs[0].description }} />
                </p>
              </div>
            </Link>
          )}
        </div>
        <div className="w-full lg:w-4/12 flex flex-col space-y-6">
          {blogs.slice(1).map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="flex space-x-4">
                <img className="w-32 h-32 object-cover" src={isValidUrl(blog.image) ? blog.image : placeholderImage} alt={blog.title} />
                <div>
                  <p className="text-gray-500">{new Date(blog.created_at).toLocaleDateString()}</p>
                  <h3 className="text-xl font-bold text-black">{blog.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </>
  );
}
