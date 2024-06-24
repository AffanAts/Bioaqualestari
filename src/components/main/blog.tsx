"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import { fetchBlogs } from "../../utils/blogAPI";
import Link from 'next/link';

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
          throw new Error("Products data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getBlogs();
  }, []);

  return (
    <>
      <div className="text-black text-center py-12">
        <h1 className="font-extrabold text-4xl mb-8">Blog</h1>
        <p className="mx-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?</p>
      </div>
      <div className="flex flex-row gap-4 justify-center px-10">
        {blogs.map((blog) => (
          <div key={blog.id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <img className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
            </div>
            <Link href={`/blog/${blog.id}`}>
              <h1>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
              </h1>
            </Link>
            <p className="mb-0 text-black pb-4">Created At: {new Date(blog.created_at).toLocaleDateString()}</p>
<<<<<<< HEAD
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.description}</p>
            <Link href={`/blog/${blog.id}`}>
              <h1 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </h1>
            </Link>
=======
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><div dangerouslySetInnerHTML={{ __html: blog.description }} /></p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
>>>>>>> 369876e8dbae849aa183ae948fb3fa296df4fb46
          </div>
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
