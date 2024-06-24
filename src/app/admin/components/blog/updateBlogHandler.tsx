import { updateBlog } from "../../../../utils/blogAPI";
import Swal from 'sweetalert2';

export const handleUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  title: string,
  image: string,
  description: string,
  author: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  // Prepare the update payload
  const updatedFields: { title?: string; image?: string; description?: string; author?: string } = {};

  // Only update title if it's changed
  if (title) {
    updatedFields.title = title;
  }

  // Only update description if it's changed
  if (description) {
    updatedFields.description = description;
  }

  // Only update image if a new URL is provided
  if (image) {
    updatedFields.image = image;
  }

  // Only update author if it's changed
  if (author) {
    updatedFields.author = author;
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
    text: "You are about to update the blog's information.",
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
      text: 'Please wait while we update the blog.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await updateBlog(id, updatedFields);

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Blog updated successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to update blog:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to update blog',
    });
  }
};
