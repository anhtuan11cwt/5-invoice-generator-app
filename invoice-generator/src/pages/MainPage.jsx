import { Pencil } from "lucide-react";
import InvoiceForm from "../components/InvoiceForm";
import TemplateGrid from "../components/TemplateGrid";
import { useAppContext } from "../context/AppContext";

const MainPage = () => {
  const { invoiceTitle, setInvoiceTitle, isEditingTitle, setIsEditingTitle } =
    useAppContext();

  const handleTitleChange = (e) => {
    setInvoiceTitle(e.target.value);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="container">
        <div className="bg-white border rounded-4 shadow-sm p-3 mb-4">
          <div className="d-flex align-items-center gap-2">
            {isEditingTitle ? (
              <input
                className="form-control"
                onBlur={() => setIsEditingTitle(false)}
                onChange={handleTitleChange}
                type="text"
                value={invoiceTitle}
              />
            ) : (
              <>
                <h3 className="mb-0">{invoiceTitle}</h3>
                <button
                  className="btn btn-sm border-0"
                  onClick={() => setIsEditingTitle(true)}
                  type="button"
                >
                  <Pencil size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="bg-white border rounded-4 shadow-sm p-4">
              <InvoiceForm />
            </div>
          </div>
          <div className="col-lg-5">
            <div className="bg-white border rounded-4 shadow-sm p-4">
              <TemplateGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
