import { insertClient } from "../../../../utils/clientAPI";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  imageUrl: string,
  toggleModal: () => void
) => {
  e.preventDefault();

  if (!imageUrl) {
    alert("Image URL is required");
    return;
  }

  try {
    await insertClient({ name, image: imageUrl });
    alert("Client added successfully");
    toggleModal(); // Close the modal
  } catch (error) {
    console.error("Failed to add client:", error);
    alert("Failed to add client");
  }
};
