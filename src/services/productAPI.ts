import { axiosInstance } from "../config/axiosInstance";

const productAPI = {
  async getAllProducts() {
    try {
      const response = await axiosInstance.get("/getAllProducts");
      console.log('API Response:', response.data); // Log ini masih bisa dipertahankan untuk debugging
      return response.data.products; // Mengakses array produk dari objek respons
    } catch (err) {
      console.log('Error fetching products:', err);
      throw err;
    }
  },
  async addProduct(data: any) {
    try {
      const response = await axiosInstance.post("/addproduct", data);
      return response.data;
    } catch (error) {
      console.log('Error adding product:', error);
      throw error;
    }
  },
  // Tambahkan method lain jika diperlukan
};

export default productAPI;
