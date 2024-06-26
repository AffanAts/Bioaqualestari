"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { fetchClients } from "../../utils/clientAPI";

interface Client {
  id: number;
  image: string;
  name: string;
}

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const clientsData: Client[] = await fetchClients();
        if (Array.isArray(clientsData)) {
          setClients(clientsData);
        } else {
          throw new Error("Clients data is not an array");
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getClients();
  }, []);

  const placeholderImage = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"; // URL gambar placeholder

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Split clients into chunks of 4 for each slide
  const chunkedClients = clients.reduce((resultArray: Client[][], item, index) => {
    const chunkIndex = Math.floor(index / 4);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <div className="container mx-auto bg-slate-300 px-10 py-10">
      <div className="text-black flex flex-wrap items-center">
        <div className="w-full md:w-1/2 px-10">
          <h1 className="text-4xl font-bold mb-8">Klien</h1>
          <p style={{ maxWidth: "500px" }}>
            Kami bangga menjadi mitra terpercaya bagi berbagai perusahaan dan organisasi di berbagai sektor industri. Klien-klien kami berasal dari beragam bidang, termasuk konstruksi, manufaktur, energi, dan banyak lagi.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          {clients.length > 0 ? (
            <Carousel showThumbs={false} showStatus={false} infiniteLoop autoPlay>
              {chunkedClients.map((slideClients, slideIndex) => (
                <div key={slideIndex} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {slideClients.map((client) => (
                    <div key={client.id} className="overflow-hidden rounded-lg pb-5 px-10">
                      <div className="relative">
                        <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mt-4">
                          <img className="object-cover w-full h-full" src={isValidUrl(client.image) ? client.image : placeholderImage} alt={client.name} />
                        </div>
                        {/* Example with Next.js Image component (uncomment if needed) */}
                        {/* <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mt-4">
                          <Image
                            src={isValidUrl(client.image) ? client.image : placeholderImage}
                            alt={client.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div> */}
                        <div className="text-center">
                          <p className="text-black text-sm font-semibold">{client.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
