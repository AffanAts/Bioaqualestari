import { insertService } from "../../../../utils/serviceAPI";
import Swal from 'sweetalert2';

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  description: string,
  imageUrl: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  if (!imageUrl) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Image URL is required',
    });
    return;
  }

  try {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we add the service.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await insertService({ name, description, image: imageUrl });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Service added successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to add service:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add service',
    });
  }
};
