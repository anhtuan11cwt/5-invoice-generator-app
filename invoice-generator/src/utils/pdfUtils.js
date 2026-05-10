import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDFFromElement = async (
  element,
  fileName = "invoice.pdf",
  returnBlob = false,
) => {
  if (!element) {
    throw new Error("Không tìm thấy phần tử xem trước");
  }

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    logging: false,
    scale: 2,
    useCORS: true,
  });

  const imageData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF({
    format: "a4",
    orientation: "portrait",
    unit: "mm",
  });

  const pdfWidth = 210;
  const pdfHeight = 297;

  const imageWidth = pdfWidth;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;

  let finalHeight = imageHeight;

  if (imageHeight > pdfHeight) {
    finalHeight = pdfHeight;
  }

  pdf.addImage(imageData, "JPEG", 0, 0, imageWidth, finalHeight);

  if (returnBlob) {
    return pdf.output("blob");
  }

  pdf.save(fileName);

  return true;
};
