"use client"; // Ensure this is at the top

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogById } from "../../../utils/blogAPI";
import CommentSection from "./commentSection";
import BlogsPage from "./relatedContents";

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
      <BlogsPage />
      <CommentSection blog={blog} setBlog={setBlog} />
    </>
  );
}
