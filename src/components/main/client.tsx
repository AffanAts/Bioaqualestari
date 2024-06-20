"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchClients } from "../../utils/clientAPI";

interface Client {
  id: number;
  image: string;
  name: string;
}

export default function ClientsPage() {
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

  const placeholderImage =
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"; // URL gambar placeholder

  // const isValidUrl = (url: string): boolean => {
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  return (
    <div className="container mx-auto bg-slate-300">
      <div className="text-black flex flex-wrap items-center">
        <div className="w-full md:w-1/2 px-10">
          <h1 className="text-4xl font-bold mb-8">Klien</h1>
          <p style={{ maxWidth: "500px" }}>
            Kami bangga menjadi mitra terpercaya bagi berbagai perusahaan dan organisasi di berbagai sektor industri. Klien-klien kami berasal dari beragam bidang, termasuk konstruksi, manufaktur, energi, dan banyak lagi.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 grid gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
          {clients.map((client) => (
            <div key={client.id} className="overflow-hidden rounded-lg pb-5 pe-10">
              <div className="relative">
                <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mt-4">
                  <img className="object-cover w-full h-full" src={client.image} alt={client.name} />
                </div>
                {/* <div className="rounded-full overflow-hidden w-20 h-20 mx-auto mt-4">
                  <Image src={isValidUrl(client.image) ? client.image : placeholderImage} alt={client.name} layout="fill" objectFit="contain" />
                </div> */}
                <div className="text-center">
                  <p className="text-black text-sm font-semibold">{client.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}