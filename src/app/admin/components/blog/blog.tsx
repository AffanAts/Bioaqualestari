import React, { useEffect, useState } from "react";
import { fetchBlogs, Blog } from "../../../../utils/blogAPI"; // Sesuaikan path sesuai struktur proyek Anda
import ModalBlog from "./addBlog";
import ModalUpdateBlog from "./updateBlog";
import { handleDeleteBlog } from "./deleteBlogHandler";
import Image from "next/image";
import Modal from "./imageModal"; // Import Modal

const BlogComponent: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setIsLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from(
    { length: Math.ceil(blogs.length / blogsPerPage) },
    (_, i) => i + 1
  );

  const openModal = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const openImageModal = (url: string) => {
    setSelectedImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
    setSelectedBlog(null);
  };

  const placeholderImage =
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"; // URL gambar placeholder

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Control</h1>
      <div className="my-5">
        <ModalBlog />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBlogs.map((blog) => (
              <tr
                key={blog.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <b style={{fontSize:"25px"}}>{blog.title}</b>
                </td>
                <td className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-white">
                  <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                </td>
                <td className=" py-4">
                  <div className="relative w-auto h-20">
                    <Image
                      onClick={() => openImageModal(isValidUrl(blog.image) ? blog.image : placeholderImage)}
                      src={
                        isValidUrl(blog.image)
                          ? blog.image
                          : placeholderImage
                      }
                      alt={blog.title}
                      layout="fill"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      objectFit="contain"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {new Date(blog.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openModal(blog)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteBlog(blog.id, blogs, setBlogs)
                    }
                    className="text-red-600 hover:underline ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstBlog + 1}-{indexOfLastBlog} of{" "}
            {blogs.length}
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === number
                      ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(blogs.length / blogsPerPage)
                }
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && selectedBlog && (
        <ModalUpdateBlog blog={selectedBlog} onClose={closeModal} />
      )}
      {isModalOpen && selectedImageUrl && (
        <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={selectedImageUrl} />
      )}
    </div>
  );
};

export default BlogComponent;
