// src/utils/addClientHandler.tsx
import { insertClient } from "../../../../utils/clientAPI";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.filePath; // Assuming the response contains the file path
};

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  imageFile: File | null,
  imageLink: string,
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageLink: React.Dispatch<React.SetStateAction<string>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  toggleModal: () => void
) => {
  e.preventDefault();
  let image = imageLink;

  if (imageFile) {
    try {
      const filePath = await uploadImage(imageFile);
      image = filePath;
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image");
      return;
    }
  }

  if (!name || !image) {
    alert("Name and image are required");
    return;
  }

  try {
    const newClient = { name, image };
    await insertClient(newClient);
    alert("Client added successfully");
    toggleModal(); // Close the modal
    // Reset fields
    setImageFile(null);
    setImageLink("");
    setImageUrl("");
  } catch (error) {
    console.error("Failed to add client:", error);
    alert("Failed to add client");
  }
};
