// ClientHandlers.ts
import { deleteClient, Client } from "../../../../utils/clientAPI";
import Swal from 'sweetalert2';

export const handleDeleteClient = async (
  id: number,
  clients: Client[],
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
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
      text: 'Please wait while we delete the client.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await deleteClient(id);

    setClients(clients.filter((client) => client.id !== id));

    Swal.fire({
      icon: 'success',
      title: 'Deleted!',
      text: 'Client has been deleted.',
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to delete client.',
    });
  }
};
