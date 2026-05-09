import "./PreviewPage.css";
import html2canvas from "html2canvas";
import { useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { AppContext } from "../context/AppContext";
import { uploadInvoiceThumbnail } from "../services/cloudService";
import { deleteInvoice, saveInvoice } from "../services/invoiceService";

const PreviewPage = () => {
  const {
    invoiceData,
    invoiceTitle,
    selectedTemplate,
    setSelectedTemplate,
    BASE_URL,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const handleSaveAndExit = async () => {
    try {
      setLoading(true);

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

      const payload = {
        billing: {
          address: invoiceData.billTo.address,
          name: invoiceData.billTo.name,
          phone: invoiceData.billTo.phone,
        },
        company: {
          address: invoiceData.company.address,
          name: invoiceData.company.name,
          phone: invoiceData.company.phone,
        },
        invoiceDetails: {
          dueDate: invoiceData.invoice.dueDate,
          invoiceDate: invoiceData.invoice.date,
          invoiceNumber: invoiceData.invoice.number,
        },
        items: invoiceData.items.map((item) => ({
          amount: Number(item.amount),
          description: item.description,
          itemName: item.name,
          quantity: Number(item.quantity),
          total: Number(item.total),
        })),
        logo: invoiceData.logo,
        notes: invoiceData.notes,
        shipping: {
          address: invoiceData.shipTo.address,
          name: invoiceData.shipTo.name,
          phone: invoiceData.shipTo.phone,
        },
        tax: Number(invoiceData.taxRate),
        template: selectedTemplate,
        thumbnailUrl: thumbnailUrl,
        title: invoiceTitle,
      };

      await saveInvoice(BASE_URL, payload);
      toast.success("Hóa đơn đã được lưu thành công!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi lưu hóa đơn. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      try {
        setLoading(true);
        await deleteInvoice(BASE_URL, invoiceData.id);
        toast.success("Đã xóa hóa đơn!");
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        toast.error("Xóa hóa đơn thất bại!");
      } finally {
        setLoading(false);
      }
    }
  };

  const templates = useMemo(
    () => [
      { id: "template1", label: "Template 1" },
      { id: "template2", label: "Template 2" },
      { id: "template3", label: "Template 3" },
      { id: "template4", label: "Template 4" },
      { id: "template5", label: "Template 5" },
    ],
    [],
  );

  return (
    <div className="preview-page bg-light min-vh-100 py-4">
      <div className="container">
        <div className="bg-white border rounded-4 shadow-sm p-3 mb-4">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-lg-center">
            <div className="d-flex flex-wrap gap-2">
              {templates.map((template) => (
                <button
                  className={`btn rounded-pill px-4 ${
                    selectedTemplate === template.id
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  type="button"
                >
                  {template.label}
                </button>
              ))}
            </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-success rounded-pill px-4 d-flex align-items-center gap-2"
                disabled={loading}
                onClick={handleSaveAndExit}
                type="button"
              >
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                )}
                {loading ? "Đang lưu..." : "Lưu & Thoát"}
              </button>
              <button
                className="btn btn-outline-danger rounded-pill px-4"
                onClick={handleDelete}
                type="button"
              >
                Xóa hóa đơn
              </button>
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                type="button"
              >
                Quay lại
              </button>
              <button
                className="btn btn-warning rounded-pill px-4"
                type="button"
              >
                Gửi Email
              </button>
              <button className="btn btn-dark rounded-pill px-4" type="button">
                Tải PDF
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="invoice-preview">
            <InvoicePreview ref={previewRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
