// addProjectHandler.tsx
import { insertProject } from "../../../../utils/projectAPI";
import Swal from 'sweetalert2';

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  title: string,
  imageUrl: string,
  description: string,
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
      text: 'Please wait while we add the project.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await insertProject({
      title,
      image: imageUrl,
      description
    });

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Project added successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to add project:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add project',
    });
  }
};
