import { deleteComment } from "../../../../../utils/commentAPI";
import { Blog, Comment } from "../../../../../utils/blogAPI";
import Swal from "sweetalert2";

export const handleDeleteComment = async (
  commentId: number,
  setBlog: React.Dispatch<React.SetStateAction<Blog | null>>
) => {
  const confirmation = await Swal.fire({
    title: 'Are you sure?',
    text: "You are about to delete this comment.",
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
    await deleteComment(commentId);
    setBlog((prevBlog) => {
      if (prevBlog) {
        const updatedComments = prevBlog.comments.filter((comment) => comment.id !== commentId);
        return { ...prevBlog, comments: updatedComments };
      }
      return null;
    });
    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Your comment has been deleted.',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete comment',
    });
  }
};
