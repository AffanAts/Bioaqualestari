import React, { useEffect, useState } from "react";
import { fetchBlogById, Blog } from "../../../../../utils/blogAPI";
import { handleDeleteComment } from "./commentBlogHandler";
import Swal from "sweetalert2";

interface ModalCommentsProps {
  blogId: number;
  onClose: () => void;
}

const ModalComments: React.FC<ModalCommentsProps> = ({ blogId, onClose }) => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const blogData = await fetchBlogById(blogId.toString());
        setBlog(blogData);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getBlog();
  }, [blogId]);

  const handleDelete = async (commentId: number) => {
    try {
      await handleDeleteComment(commentId, setBlog);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete comment',
      });
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <div
        id="crud-modal"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-6xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Comments
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="mb-4">
                {blog?.comments && blog.comments.length > 0 ? (
                  blog.comments.map((comment) => (
                    <div key={comment.id} className="mb-4">
                      <p className="text-gray-600 mb-1"><strong>{comment.name}</strong> on {new Date(comment.created_at).toLocaleString()}</p>
                      <p>{comment.comment}</p>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComments;
