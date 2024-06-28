import React, { useEffect, useState } from "react";
import { fetchServices, Service } from "../../../../utils/serviceAPI"; // Sesuaikan path sesuai struktur proyek Anda
import ModalService from "./addService";
import ModalUpdateService from "./updateService";
import { handleDeleteService } from "./deleteServiceHandler";
import Image from "next/image";
import Modal from "./imageModal"; // Import Modal

type url = {
  image: string;
  name: string;
  description: string;
};

const TableComponent: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Tambahkan ini

  useEffect(() => {
    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    getServices();
  }, []);

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = Array.from(
    { length: Math.ceil(services.length / servicesPerPage) },
    (_, i) => i + 1
  );

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const openImageModal = (url: string) => {
    setSelectedImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageUrl(null);
    setSelectedService(null); // Tambahkan ini
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
      <h1 className="text-2xl font-bold mb-4">Service Control</h1>
      <div className="my-5">
        <ModalService />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Service Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentServices.map((service) => (
              <tr
                key={service.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  <b style={{fontSize:"25px"}}>{service.name}</b>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {service.description}
                </td>
                <td className=" py-4">
                  <div className="relative w-auto h-20">
                    <Image
                      onClick={() => openImageModal(isValidUrl(service.image) ? service.image : placeholderImage)}
                      src={
                        isValidUrl(service.image)
                          ? service.image
                          : placeholderImage
                      }
                      alt={service.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => openModal(service)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteService(service.id, services, setServices)
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
            Showing {indexOfFirstService + 1}-{indexOfLastService} of{" "}
            {services.length}
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
                  currentPage === Math.ceil(services.length / servicesPerPage)
                }
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      {isModalOpen && selectedService && (
        <ModalUpdateService service={selectedService} onClose={closeModal} />
      )}
      {isModalOpen && selectedImageUrl && (
        <Modal isOpen={isModalOpen} onClose={closeModal} imageUrl={selectedImageUrl} />
      )}
    </div>
  );
};

export default TableComponent;
