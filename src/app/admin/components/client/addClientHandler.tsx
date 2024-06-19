import { insertClient } from "../../../../utils/clientAPI";
import Swal from 'sweetalert2';

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
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
      text: 'Please wait while we add the client.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await insertClient({ name, image: imageUrl });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Client added successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to add client:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add client',
    });
  }
};
