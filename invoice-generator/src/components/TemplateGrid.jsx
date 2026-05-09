import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const TemplateGrid = () => {
  const navigate = useNavigate();
  const { invoiceData, setSelectedTemplate } = useAppContext();

  const templates = [
    assets.template1,
    assets.template2,
    assets.template3,
    assets.template4,
    assets.template5,
  ];

  const validateInvoice = () => {
    const invalidItem = invoiceData.items.some(
      (item) => item.quantity <= 0 || item.amount <= 0,
    );
    if (invalidItem) {
      alert("Số lượng và đơn giá phải lớn hơn 0");
      return false;
    }
    return true;
  };

  const handleSelectTemplate = (template) => {
    if (!validateInvoice()) return;
    setSelectedTemplate(template);
    navigate("/preview");
  };

  return (
    <div>
      <h4 className="mb-4">Chọn Mẫu Hóa Đơn</h4>
      <div className="row g-3">
        {templates.map((template) => (
          <div className="col-6" key={template}>
            <button
              className="border rounded-4 overflow-hidden shadow-sm template-card w-100 p-0"
              onClick={() => handleSelectTemplate(template)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              type="button"
            >
              <img alt="" className="img-fluid" src={template} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGrid;
