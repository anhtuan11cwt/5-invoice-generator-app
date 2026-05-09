import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDFFromElement = async (
  element,
  fileName = "invoice.pdf",
  returnBlob = false,
) => {
  try {
    if (!element) {
      throw new Error("Không tìm thấy phần tử xem trước");
    }

    // Capture HTML as high-quality canvas
    const canvas = await html2canvas(element, {
      backgroundColor: "#ffffff",
      logging: false,
      scale: 2,
      useCORS: true,
    });

    // Convert canvas to image
    const imageData = canvas.toDataURL("image/jpeg", 1.0);

    // Create A4 PDF
    const pdf = new jsPDF({
      format: "a4",
      orientation: "portrait",
      unit: "mm",
    });

    // A4 dimensions
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Image dimensions
    const imageWidth = pdfWidth;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;

    let finalHeight = imageHeight;

    // Prevent overflow
    if (imageHeight > pdfHeight) {
      finalHeight = pdfHeight;
    }

    pdf.addImage(imageData, "JPEG", 0, 0, imageWidth, finalHeight);

    // Return blob for potential email feature
    if (returnBlob) {
      return pdf.output("blob");
    }

    // Download PDF
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error("Tạo PDF thất bại:", error);
    throw error;
  }
};
