// ProjectHandlers.ts
import { deleteProject, Project } from "../../../../utils/projectAPI";
import Swal from 'sweetalert2';

export const handleDeleteProject = async (
  id: number,
  Projects: Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
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
      text: 'Please wait while we delete the project.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await deleteProject(id);

    setProjects(Projects.filter((project) => project.id !== id));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Project has been deleted.',
    }).then(() => {
      window.location.reload(); // Refresh halaman setelah berhasil menghapus proyek
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete project.',
    });
  }
};
