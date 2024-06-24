import { useState } from "react";
import { handleUpdate } from "./updateServiceHandler";
import Image from "next/image";

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ModalUpdateServiceProps {
  service: Service;
  onClose: () => void;
}

const ModalUpdateService: React.FC<ModalUpdateServiceProps> = ({
  service,
  onClose,
}) => {
  const [imageUrl, setImageUrl] = useState<string>(service.image);
  const [name, setName] = useState<string>(service.name);
  const [description, setDescription] = useState<string>(service.description);

  return (
    <div>
      <div
        id="crud-modal"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-4xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Service
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
                handleUpdate(e, service.id, name, description, imageUrl, onClose)
              }
            >
              <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type service name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type service description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="imageUrl"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      id="imageUrl"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Paste image URL here"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  {imageUrl && (
                    <div className="col-span-2">
                      <img src={imageUrl} alt="Selected" className="rounded-lg" />
                    </div>
                  )}
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
                        d="M10 5a1 1 0 011 1v3h3a1 1 110 2h-3v3a1 1 11-2 0v-3H6a1 1 110-2h3V6a1 1 111-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Update service
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

export default ModalUpdateService;