import "./PreviewPage.css";
import { useContext, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InvoicePreview from "../components/InvoicePreview";
import { AppContext } from "../context/AppContext";
import { saveInvoice } from "../services/invoiceService";

const PreviewPage = () => {
  const {
    selectedTemplate,
    setSelectedTemplate,
    invoiceTitle,
    invoiceData,
    BASE_URL,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const handleSaveAndExit = async () => {
    try {
      setLoading(true);
      const payload = {
        invoiceData: invoiceData,
        template: selectedTemplate,
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
        {/* HEADER */}
        <div className="bg-white border rounded-4 shadow-sm p-3 mb-4">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-between align-items-lg-center">
            {/* TEMPLATE SWITCHER */}
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

            {/* ACTION BUTTONS */}
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

        {/* PREVIEW SECTION */}
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
