import { deleteService, Service } from "../../../../utils/serviceAPI";
import Swal from 'sweetalert2';

export const handleDeleteService = async (
  id: number,
  services: Service[],
  setServices: React.Dispatch<React.SetStateAction<Service[]>>
) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });

  if (!confirmation.isConfirmed) {
    return;
  }

  try {
    Swal.fire({
      title: 'Deleting...',
      text: 'Please wait while we delete the service.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await deleteService(id);

    setServices(services.filter((service) => service.id !== id));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Service has been deleted.',
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete service.',
    });
  }
};
