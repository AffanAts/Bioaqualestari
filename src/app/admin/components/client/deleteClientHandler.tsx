import { deleteClient, Client } from "../../../../utils/clientAPI";
import Swal from "sweetalert2";

export const handleDeleteClient = async (
  id: number,
  clients: Client[],
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      await deleteClient(id);
      setClients(clients.filter((client) => client.id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  } catch (error) {
    console.error("Error deleting client:", error);
  }
};
