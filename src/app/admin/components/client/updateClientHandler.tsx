import { updateClient } from "../../../../utils/clientAPI";

export const handleUpdate = async (
  e: React.FormEvent<HTMLFormElement>,
  id: number,
  name: string,
  imageUrl: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  // Prepare the update payload
  const updatedFields: { name?: string; image?: string } = {};

  // Only update name if it's changed
  if (name) {
    updatedFields.name = name;
  }

  // Only update image if a new URL is provided
  if (imageUrl) {
    updatedFields.image = imageUrl;
  }

  if (Object.keys(updatedFields).length === 0) {
    alert("No fields to update");
    return;
  }

  try {
    await updateClient(id, updatedFields);
    alert("Client updated successfully");
    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to update client:", error);
    alert("Failed to update client");
  }
};
