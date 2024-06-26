// ProjectsPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../utils/projectAPI";
import Image from "next/image";
// import Modal from "./ModalProject";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}
const placeholderImage = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"; // URL gambar placeholder

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};
const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  // const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const projectsData: Project[] = await fetchProjects();
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else {
          throw new Error("Projects data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getProjects();
  }, []);

  // const handleShowModal = () => {
  //   setShowModal(true);
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

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
      <div className="text-black text-center">
        <h1 className="font-extrabold text-4xl mb-8">Our Project</h1>
        <p className="mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?
        </p>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {projects.slice(0, 3).map((project, index) => (
        <div key={project.id} className={`mx-20 flex flex-col md:flex-row gap-8 py-10 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
          <img src={isValidUrl(project.image) ? project.image : placeholderImage} alt={project.title} className="rounded-lg w-full md:w-1/2 object-cover" style={{ height: "300px" }} />
          <div className="text-black m-10 w-full md:w-1/2">
            <p className="text-xl font-semibold">Our Portfolio</p>
            <p className="text-4xl font-bold">{project.title}</p>
            <p>{project.description}</p>
          </div>
        </div>
      ))}
      {/* {projects.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Show More Projects
          </button>
        </div>
      )}
      {showModal && (
        <Modal onClose={closeModal}>
          <div className="flex flex-col">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={` flex flex-col md:flex-row  ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg w-full md:w-1/2 object-cover"
                  style={{ height: "300px" }}
                />
                <div className="text-black m-10 w-full md:w-1/2">
                  <p className="text-xl font-semibold">Our Portfolio</p>
                  <p className="text-4xl font-bold">{project.title}</p>
                  <p>{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )} */}
    </>
  );
};

export default ProjectsPage;
