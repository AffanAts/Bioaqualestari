"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchServices } from "../../utils/serviceAPI";

interface Service {
  id: number;
  name: string;
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

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getServices = async () => {
      try {
        const servicesData: Service[] = await fetchServices();
        if (Array.isArray(servicesData)) {
          console.log(servicesData); // Check image paths
          setServices(servicesData);
        } else {
          throw new Error("Products data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getServices();
  }, []);

  const truncateDescription = (description: string) => {
    if (description.length <= 200) {
      return description;
    }
    return description.slice(0, 200) + "...";
  };

  return (
    <div className="bg-white font-sans min-h-96">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            Layanan Kami
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto px-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative transition-all duration-300 group"
            >
              <Image
                width={200}
                height={200}
                src={
                  isValidUrl(service.image) ? service.image : placeholderImage
                }
                alt={`Service Post ${service.id}`}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-white text-center">
                <div>
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <hr className="my-6 border-gray-300" />
                  <p className="text-sm">
                    {truncateDescription(service.description)}
                  </p>
                </div>
              </div>
              <h3 className="text-xl font-bold absolute bottom-4 left-4 z-10 text-white p-2 transition-opacity duration-300 group-hover:opacity-0">
                {service.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
