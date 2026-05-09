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

export const deleteInvoice = async (baseURL, id) => {
  try {
    const response = await axios.delete(`${baseURL}/api/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Lỗi khi xóa hóa đơn:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const sendInvoice = async (baseURL, formData) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/invoices/send-invoice`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi email:", error.response?.data || error.message);
    throw error;
  }
};
