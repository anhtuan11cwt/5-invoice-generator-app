import axios from "axios";

export const saveInvoice = async (baseURL, payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/invoices`, payload);
    return response.data;
  } catch (error) {
    console.error("Lỗi lưu hóa đơn:", error.response?.data || error.message);
    throw error;
  }
};
