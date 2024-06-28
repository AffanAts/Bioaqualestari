import React, { useEffect, useState } from "react";
import { fetchProjects, Project } from "../../../../utils/projectAPI";
import ModalProject from "./addProject";
import ModalUpdateProject from "./updateProject";
import { handleDeleteProject } from "./deleteProjectHandler";
import Image from "next/image";
import Modal from "../../../../components/imageModal";

const ReadMore: React.FC<{ text: string }> = ({ text }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => setIsReadMore(!isReadMore);

  return (
    <div className={isReadMore ? "inline" : ""}>
      {isReadMore ? text.slice(0, 30) : text}
      {text.length > 30 && (
        <span
          onClick={toggleReadMore}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {isReadMore ? "... Read more" : " Show less"}
        </span>
      )}
    </div>
  );
};

const TableComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };

    getProjects();
  }, []);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from(
    { length: Math.ceil(projects.length / projectsPerPage) },
    (_, i) => i + 1
  );

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const openImageModal = (url: string) => {
    setSelectedImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setSelectedImageUrl(null);
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
      <h1 className="text-2xl font-bold mb-4">Project Control</h1>
      <div className="my-5">
        <ModalProject />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Project Title
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
              <tr
                key={project.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <b style={{ fontSize: "15px" }}>{project.title}</b>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-auto h-20">
                    <Image
                      onClick={() =>
                        openImageModal(
                          isValidUrl(project.image)
                            ? project.image
                            : placeholderImage
                        )
                      }
                      src={
                        isValidUrl(project.image)
                          ? project.image
                          : placeholderImage
                      }
                      alt={project.title}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <b style={{ fontSize: "15px" }}>
                    <ReadMore text={project.description} />
                  </b>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openModal(project)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteProject(project.id, projects, setProjects)
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
            Showing {indexOfFirstProject + 1}-{indexOfLastProject} of{" "}
            {projects.length}
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
                  currentPage === Math.ceil(projects.length / projectsPerPage)
                }
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && selectedProject && (
        <ModalUpdateProject project={selectedProject} onClose={closeModal} />
      )}
      {isModalOpen && selectedImageUrl && (
        <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={selectedImageUrl} />
      )}
    </div>
  );
};

export default TableComponent;
