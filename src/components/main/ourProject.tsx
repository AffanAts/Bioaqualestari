"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProjects } from "../../utils/projectAPI";

interface Project {
    id: number;
    title: string;
    image: string;
    description: string;
  }

const ourProject = () => {
  return (
    <>
      <div className="text-black text-center py-12">
        <h1 className="font-extrabold text-4xl mb-8">Our Project</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi tempore illum atque hic rerum, necessitatibus asperiores quaerat nam mollitia itaque culpa similique error dolor! Incidunt consectetur deleniti recusandae ut et?</p>
      </div>
      <div className="p-10 flex flex-row">
        <img src="https://i.ibb.co.com/sRF40bm/Whats-App-Image-2024-06-12-at-23-23-02-0a5ceb83.jpg" alt="" style={{ width: "500px"}} className="rounded-lg"/>
        <div className="text-black m-10">
            <p className="text-xl font-semibold">Our Portofolio</p>
            <p className="text-4xl font-bold">Social Media Monitoring</p>
            <p>SMM is a system for measuring the success of social media marketing strategies used by companies or brands.</p>
        </div>
      </div>
    </>
  );
};

export default ourProject;
