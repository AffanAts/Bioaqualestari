import { insertBlog } from "../../../../utils/blogAPI";
import Swal from 'sweetalert2';

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  title: string,
  image: string,
  description: string,
  author: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  if (!image) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Image URL is required',
    });
    return;
  }

  const newBlog = { title, image, description, author };
  console.log("Data to be sent to the server:", newBlog); // Log the data for debugging

  try {
    Swal.fire({
      title: 'Loading...',
      text: 'Please wait while we add the blog.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const response = await insertBlog(newBlog);
    console.log("Response from the server:", response); // Log the response for debugging

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Blog added successfully',
    }).then(() => {
      window.location.reload(); // Reload the page after showing the success message
    });

    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to add blog:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to add blog',
    });
  }
};
