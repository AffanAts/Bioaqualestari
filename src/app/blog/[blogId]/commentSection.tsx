import { insertComment } from "@/utils/commentAPI";
import React, { useState } from "react";

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

interface CommentSectionProps {
  blog: Blog;
  setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
}

export default function CommentSection({ blog, setBlog }: CommentSectionProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  const handleInsertComment = async () => {
    if (newComment.trim() === "" || newName.trim() === "") {
      alert("Comment and Name cannot be empty");
      return;
    }

    try {
      const commentData = {
        comment: newComment,
        blog_id: blog.id,
        name: newName,
      };
      const insertedComment = await insertComment(commentData);

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
      
      // Reload the page after successful comment insertion
      window.location.reload();
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <>
      <div className="container p-4 mx-auto max-w-screen-lg text-black">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {blog.comments.length > 0 ? (
          blog.comments.map((comment) => (
            <div key={comment.id} className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4">
              <div className="flex items-center mb-2">
                <img src="https://i.pinimg.com/236x/57/2d/6b/572d6b5e842f4e2fd514f8fd5c32e779.jpg" className="rounded-full w-12 h-12 mr-3" alt="" />
                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">@{comment.name}</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{new Date(comment.created_at).toLocaleString()}</p>
                </div>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400 pt-5 break-words">{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Add a Comment</h3>
          <p className="text-black font-semibold pb-2">Name</p>
          <input type="text" className="border p-2 w-full mb-2 rounded-lg" placeholder="Your Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <p className="text-black font-semibold pb-2">Comment</p>
          <textarea className="border p-2 w-full mb-2 rounded-lg" placeholder="Your Comment" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleInsertComment}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
