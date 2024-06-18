// ClientHandlers.ts
import { deleteClient, Client } from "../../../../utils/clientAPI";


export const handleDeleteClient = async (
  id: number,
  clients: Client[],
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
) => {
  try {
    await deleteClient(id);
    setClients(clients.filter((client) => client.id !== id));
  } catch (error) {
    console.error("Error deleting client:", error);
  }
};
