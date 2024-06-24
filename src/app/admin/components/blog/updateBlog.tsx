import React, { useState, ChangeEvent } from "react";
import { handleUpdate } from "./updateBlogHandler";
import dynamic from 'next/dynamic';
import "react-quill/dist/quill.snow.css"; // Import the styles
import Image from "next/image";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Blog {
  id: number;
  title: string;
  image: string;
  description: string;
  author: string;
}

interface ModalUpdateBlogProps {
  blog: Blog;
  onClose: () => void;
}

const ModalUpdateBlog: React.FC<ModalUpdateBlogProps> = ({ blog, onClose }) => {
  const [image, setImage] = useState<string>(blog.image);
  const [title, setTitle] = useState<string>(blog.title);
  const [description, setDescription] = useState<string>(blog.description);
  const [author, setAuthor] = useState<string>(blog.author);

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
                Update Blog
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
            <form
              className="p-4 md:p-5"
              onSubmit={(e) =>
                handleUpdate(e, blog.id, title, image, description, author, onClose)
              }
            >
              <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <div className="col-span-2">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      id="image"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Paste image URL here"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  {image && (
                    <div className="col-span-2">
                      <img src={image} alt="Selected" className="rounded-lg" />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <ReactQuill value={description} onChange={setDescription} />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="author"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type author name"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 110 2h-3v3a1 1 11-2 0v-3H6a 1 1 110-2h3V6a1 1 111-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Update blog
                  </button>
                </div>
                <div className="col-span-1 pt-5 md:pt-0">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <b>Tutorial mendapatkan Link URL gambar</b>
                  </p>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 list-decimal list-inside pt-2">
                    <li>
                      Kunjungi Website Berikut{" "}
                      <a
                        href="https://img.doerig.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Klik Disini
                      </a>{" "}
                    </li>
                    <li>
                      Klik &quot;Upload a file&quot; seperti pada gambar berikut
                      <center>
                        {" "}
                        <div className="relative w-full h-56">
                          <Image
                            src="https://i.imgur.com/JcjYQZ6.jpeg"
                            alt="Gambar"
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                      </center>
                    </li>
                    <li>
                      Pilihlah gambar yang ingin anda upload dan klik button
                      &quot;upload&quot;
                    </li>
                    <li>
                      Jika berhasil akan ada tulisan &quot;Success&quot; dan anda bisa
                      menyalin link gambar tersebut
                      <center>
                        <div className="relative w-full h-80">
                          <Image
                            alt="Gambar"
                            layout="fill"
                            objectFit="contain"
                            src="https://i.imgur.com/lndMtjB.jpeg"
                          />
                        </div>
                      </center>
                    </li>
                  </ol>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateBlog;