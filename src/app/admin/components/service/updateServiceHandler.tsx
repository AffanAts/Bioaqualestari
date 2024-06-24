import { updateService } from "../../../../utils/serviceAPI";
import Swal from 'sweetalert2';

export const handleUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  name: string,
  description: string,
  imageUrl: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  // Prepare the update payload
  const updatedFields: { name?: string; description?: string; image?: string } = {};

  // Only update name if it's changed
  if (name) {
    updatedFields.name = name;
  }

  // Only update description if it's changed
  if (description) {
    updatedFields.description = description;
  }

  // Only update image if a new URL is provided
  if (imageUrl) {
    updatedFields.image = imageUrl;
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
    text: "You are about to update the service's information.",
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
      text: 'Please wait while we update the service.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await updateService(id, updatedFields);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Service updated successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to update service:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update service',
    });
  }
};
