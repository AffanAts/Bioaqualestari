"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchClients } from "../../utils/clientAPI";
import Image from "next/image";
import { placeholderImage, isValidUrl } from "../../components/invalidImage";

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

  const placeholderImage =
    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    autoplay: true,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto bg-slate-300 px-10 py-10">
      <div className="text-black flex flex-wrap items-center">
        <div className="w-full md:w-1/2 px-10">
          <h1 className="text-4xl font-bold mb-8">Klien</h1>
          <p style={{ maxWidth: "500px" }}>
            Kami bangga menjadi mitra terpercaya bagi berbagai perusahaan dan
            organisasi di berbagai sektor industri. Klien-klien kami berasal
            dari beragam bidang, termasuk konstruksi, manufaktur, energi, dan
            banyak lagi.
          </p>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          {clients.length > 0 ? (
            <Slider {...settings}>
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="overflow-hidden rounded-lg pb-5 px-10"
                >
                  <div className="relative">
                    <div className="w-48 h-48 mx-auto mt-4 rounded-full overflow-hidden relative">
                      <Image
                        src={
                          isValidUrl(client.image)
                            ? client.image
                            : placeholderImage
                        }
                        alt={client.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="text-center"></div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
