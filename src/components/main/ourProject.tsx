"use client";

import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../utils/projectAPI";
import DialogXXL from "./ourProjectModal";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
}
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

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

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

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="text-black text-center">
        <h1 className="font-extrabold text-4xl mb-8">Our Project</h1>
        <p className="mx-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore
          illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia
          itaque culpa similique error dolor! Incidunt consectetur deleniti
          recusandae ut et?
        </p>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {projects.slice(0, 3).map((project, index) => (
        <div
          key={project.id}
          className={`mx-20 flex flex-col md:flex-row gap-8 py-10 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <img
            src={isValidUrl(project.image) ? project.image : placeholderImage}
            alt={project.title}
            className="rounded-lg w-full md:w-1/2 object-cover"
            style={{ height: "300px" }}
          />
          <div className="text-black w-full md:w-1/2">
            <p className="text-xl my-3 font-semibold">Our Portfolio</p>
            <p className="text-5xl mt-5 font-bold">{project.title}</p>
            <p className="text-xl mt-5">{project.description}</p>
          </div>
        </div>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={openDialog}
          className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg active:opacity-[0.85]"
        >
          View More
        </button>
      </div>
      <DialogXXL isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  );
};

export default ProjectsPage;
