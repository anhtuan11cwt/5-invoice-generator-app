import "./PreviewPage.css";
import html2canvas from "html2canvas";
import { useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../hooks/useAuth";
import { uploadInvoiceThumbnail } from "../services/cloudService";
import {
  deleteInvoice,
  saveInvoice,
  sendInvoice,
} from "../services/invoiceService";
import { generatePDFFromElement } from "../utils/pdfUtils";

const PreviewPage = () => {
  const { getToken } = useAuth();
  const {
    invoiceData,
    invoiceTitle,
    selectedTemplate,
    setSelectedTemplate,
    BASE_URL,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const handleSendEmail = async () => {
    try {
      if (!customerEmail.trim()) {
        return toast.error("Vui lòng nhập email");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        return toast.error("Email không hợp lệ");
      }

      setSendingEmail(true);

      const pdfBlob = await generatePDFFromElement(
        previewRef.current,
        "invoice.pdf",
        true,
      );

      const formData = new FormData();
      formData.append("file", pdfBlob, "invoice.pdf");
      formData.append("customerEmail", customerEmail);

      await sendInvoice(BASE_URL, formData, getToken);
      toast.success("Email đã được gửi thành công");
      setShowModal(false);
      setCustomerEmail("");
    } catch {
      toast.error("Gửi email thất bại");
    } finally {
      setSendingEmail(false);
    }
  };

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

      await saveInvoice(BASE_URL, payload, getToken);
      toast.success("Hóa đơn đã được lưu thành công!");
      navigate("/dashboard");
    } catch {
      toast.error("Lỗi khi lưu hóa đơn. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      try {
        setLoading(true);
        await deleteInvoice(BASE_URL, invoiceData.id, getToken);
        toast.success("Đã xóa hóa đơn!");
        navigate("/dashboard");
      } catch {
        toast.error("Xóa hóa đơn thất bại!");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      if (!previewRef.current) {
        toast.error("Không tìm thấy dữ liệu xem trước");
        return;
      }

      setDownloading(true);

      const safeTitle = invoiceTitle?.trim()?.replace(/\s+/g, "-") || "invoice";

      await generatePDFFromElement(previewRef.current, `${safeTitle}.pdf`);

      toast.success("Đã tải PDF thành công");
    } catch {
      toast.error("Lỗi khi tạo PDF");
    } finally {
      setDownloading(false);
    }
  };

  const templates = useMemo(
    () => [
      { id: "template1", label: "Mẫu 1" },
      { id: "template2", label: "Mẫu 2" },
      { id: "template3", label: "Mẫu 3" },
      { id: "template4", label: "Mẫu 4" },
      { id: "template5", label: "Mẫu 5" },
    ],
    [],
  );

  return (
    <div className="bg-light py-4 preview-page min-vh-100">
      <div className="container">
        <div className="bg-white shadow-sm mb-4 p-3 border rounded-4">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
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
                className="d-flex align-items-center gap-2 px-4 rounded-pill btn btn-success"
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
                className="px-4 rounded-pill btn-outline-danger btn"
                onClick={handleDelete}
                type="button"
              >
                Xóa hóa đơn
              </button>
              <button
                className="px-4 rounded-pill btn-outline-secondary btn"
                type="button"
              >
                Quay lại
              </button>
              <button
                className="px-4 rounded-pill btn btn-warning"
                onClick={() => setShowModal(true)}
                type="button"
              >
                Gửi Email
              </button>
              {/* Modal Email */}
              {showModal && (
                <div
                  className="d-block modal fade show"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Gửi Hóa Đơn</h5>
                        <button
                          className="btn-close"
                          onClick={() => setShowModal(false)}
                          type="button"
                        />
                      </div>
                      <div className="modal-body">
                        <input
                          className="form-control"
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Nhập email khách hàng"
                          type="email"
                          value={customerEmail}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-light"
                          onClick={() => setShowModal(false)}
                          type="button"
                        >
                          Hủy
                        </button>
                        <button
                          className="btn btn-primary"
                          disabled={sendingEmail}
                          onClick={handleSendEmail}
                          type="button"
                        >
                          {sendingEmail ? "Đang gửi..." : "Gửi"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <button
                className="d-flex align-items-center gap-2 px-4 rounded-pill btn btn-dark"
                disabled={downloading}
                onClick={handleDownloadPDF}
                type="button"
              >
                {downloading && (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  />
                )}
                {downloading ? "Đang tải..." : "Tải PDF"}
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
