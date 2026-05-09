import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = "invoices-thumbnail";
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadInvoiceThumbnail = async (imageData) => {
  try {
    const blob = await fetch(imageData).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "5-invoice-generator-app");

    const response = await axios.post(CLOUDINARY_URL, formData);
    return response.data.secure_url;
  } catch (error) {
    console.error("Lỗi tải lên hình thu nhỏ:", error);
    throw error;
  }
};
