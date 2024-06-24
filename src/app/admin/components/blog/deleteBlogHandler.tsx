import { deleteBlog, Blog } from "../../../../utils/blogAPI";
import Swal from 'sweetalert2';

export const handleDeleteBlog = async (
  id: number,
  blogs: Blog[],
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>
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
      text: 'Please wait while we delete the blog.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await deleteBlog(id);

    setBlogs(blogs.filter((blog) => blog.id !== id));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Blog has been deleted.',
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete blog.',
    });
  }
};
