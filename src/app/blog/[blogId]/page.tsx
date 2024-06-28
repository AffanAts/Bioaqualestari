"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [params.blogId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  const backButtonStyle: React.CSSProperties = isMobile
    ? {
        position: "sticky",
        top: "1rem",
        zIndex: 999,
      }
    : {
        position: "absolute",
        top: "1rem",
        left: "1rem",
      };

  return (
    <>
      <div className="container text-black px-4 md:px-60 relative">
        <Link href="/">
          <button
            type="button"
            style={backButtonStyle}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Back
          </button>
        </Link>
        <h1 className="text-4xl font-bold mb-4 mt-12">{blog.title}</h1>
        <p className="text-gray-600 mb-4">
          By {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
        </p>
        <img className="w-full h-70 object-cover mb-4" src={blog.image} alt={blog.title} />
        <div className="text-lg" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
      </div>
      <div className="px-4 container p-4 mx-auto max-w-screen-lg">
        <h1 className="text-black text-3xl font-bold container pb-4 mx-auto max-w-screen-lg">Related Contents</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <img className="w-full h-70 object-cover mb-4" src={blog.image} alt={blog.title} />
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Created: {new Date(blog.created_at).toLocaleDateString()}</p>
          </a>
          <a href="#" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </a>
          <a href="#" className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </a>
        </div>
      </div>
      <CommentSection blog={blog} setBlog={setBlog} />
    </>
  );
}
