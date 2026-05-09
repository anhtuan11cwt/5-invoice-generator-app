import axios from "axios";

export const saveInvoice = async (baseURL, payload) => {
  try {
    const response = await axios.post(`${baseURL}/api/invoices`, payload);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lưu hóa đơn:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getAllInvoices = async (baseURL) => {
  try {
    const response = await axios.get(`${baseURL}/api/invoices`);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi lấy danh sách hóa đơn:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
