// updateProjectHandler.tsx
import { updateProject } from "../../../../utils/projectAPI";
import Swal from 'sweetalert2';

export const handleUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  title: string,
  imageUrl: string,
  description: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  // Prepare the update payload
  const updatedFields: { title?: string; image?: string; description?: string } = {};

  // Only update fields if they are changed
  if (title) {
    updatedFields.title = title;
  }

  if (imageUrl) {
    updatedFields.image = imageUrl;
  }

  if (description) {
    updatedFields.description = description;
  }

  if (Object.keys(updatedFields).length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No fields to update',
    });
    return;
  }

  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "You are about to update the project's information.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, update it!'
  });

  if (!confirmation.isConfirmed) {
    return;
  }

  try {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we update the project.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await updateProject(id, updatedFields);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Project updated successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to update project:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update project',
    });
  }
};
