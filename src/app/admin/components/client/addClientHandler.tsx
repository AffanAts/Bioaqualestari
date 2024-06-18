import { insertClient } from "../../../../utils/clientAPI";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  imageFile: File | null,
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
  toggleModal: () => void
) => {
  e.preventDefault();

  if (!imageFile) {
    alert("Image file is required");
    return;
  }

  // Convert image file to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  let base64Image;
  try {
    base64Image = await toBase64(imageFile);
  } catch (error) {
    console.error("Failed to convert image to base64:", error);
    alert("Failed to process image");
    return;
  }

  try {
    await insertClient({ name, image: base64Image });
    alert("Client added successfully");
    toggleModal(); // Close the modal
    // Reset fields
    setImageFile(null);
    setImageUrl("");
  } catch (error) {
    console.error("Failed to add client:", error);
    alert("Failed to add client");
  }
};
