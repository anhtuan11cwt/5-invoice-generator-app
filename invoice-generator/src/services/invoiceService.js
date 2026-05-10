import axios from "axios";

const getAuthHeader = (getToken) => {
  return async () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };
};

export const saveInvoice = async (baseURL, payload, getToken) => {
  const headers = await getAuthHeader(getToken)();
  const response = await axios.post(`${baseURL}/api/invoices`, payload, {
    headers,
  });
  return response.data;
};

export const getAllInvoices = async (baseURL, getToken) => {
  const headers = await getAuthHeader(getToken)();
  const response = await axios.get(`${baseURL}/api/invoices`, {
    headers,
  });
  return response.data;
};

export const deleteInvoice = async (baseURL, id, getToken) => {
  const headers = await getAuthHeader(getToken)();
  const response = await axios.delete(`${baseURL}/api/invoices/${id}`, {
    headers,
  });
  return response.data;
};

export const sendInvoice = async (baseURL, formData, getToken) => {
  const headers = await getAuthHeader(getToken)();
  const response = await axios.post(
    `${baseURL}/api/invoices/send-invoice`,
    formData,
    {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};
