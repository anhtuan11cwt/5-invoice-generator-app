import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getAllInvoices } from "../services/invoiceService";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const {
    BASE_URL,
    setInvoiceData,
    initialInvoiceData,
    setInvoiceTitle,
    setSelectedTemplate,
  } = useContext(AppContext);

  const fetchInvoices = useCallback(async () => {
    try {
      const data = await getAllInvoices(BASE_URL);
      setInvoices(data);
    } catch (error) {
      console.error(error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchInvoices();
    }
  }, [fetchInvoices]);

  const handleCreateNew = () => {
    setInvoiceData(initialInvoiceData);
    setInvoiceTitle("Hóa Đơn Mới");
    setSelectedTemplate("template1");
    navigate("/generate");
  };

  const handleOpenInvoice = (invoice) => {
    setInvoiceTitle(invoice.title);

    // Map backend structure to frontend structure
    const mappedData = {
      bank: {
        accountHolder: invoice.bank?.accountHolder || "",
        accountNumber: invoice.bank?.accountNumber || "",
        bankName: invoice.bank?.bankName || "",
      },
      billTo: {
        address: invoice.billing?.address || "",
        name: invoice.billing?.name || "",
        phone: invoice.billing?.phone || "",
      },
      company: {
        address: invoice.company?.address || "",
        name: invoice.company?.name || "",
        phone: invoice.company?.phone || "",
      },
      grandTotal: 0,
      invoice: {
        date: invoice.invoiceDetails?.invoiceDate || "",
        dueDate: invoice.invoiceDetails?.dueDate || "",
        number: invoice.invoiceDetails?.invoiceNumber || "",
      },
      items:
        invoice.items?.map((item) => ({
          amount: item.amount || 0,
          description: item.description || "",
          id: Date.now() + Math.random(),
          name: item.itemName || "",
          quantity: item.quantity || 0,
          total: item.total || 0,
        })) || [],
      logo: invoice.logo || "",
      notes: invoice.notes || "",
      shipTo: {
        address: invoice.shipping?.address || "",
        name: invoice.shipping?.name || "",
        phone: invoice.shipping?.phone || "",
      },
      subtotal: 0,
      taxAmount: 0,
      taxRate: invoice.tax || 0,
    };

    setInvoiceData(mappedData);
    setSelectedTemplate(invoice.template);
    navigate("/preview");
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Quản lý hóa đơn của bạn</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Create New Card */}
        <div className="col-md-4 col-lg-3">
          <button
            className="btn btn-light border-2 border-dashed w-100 h-100 shadow-sm"
            onClick={handleCreateNew}
            style={{ cursor: "pointer", minHeight: "280px" }}
            type="button"
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3"
                style={{ height: "60px", width: "60px" }}
              >
                <h2 className="mb-0">+</h2>
              </div>
              <h5 className="fw-bold">Tạo Hóa Đơn</h5>
            </div>
          </button>
        </div>

        {/* Invoice List */}
        {invoices.length === 0 ? (
          <div className="col-md-4 col-lg-3">
            <div className="card shadow-sm h-100">
              <div
                className="card-body d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "280px" }}
              >
                <p className="text-muted">Chưa có hóa đơn nào</p>
              </div>
            </div>
          </div>
        ) : (
          invoices.map((invoice) => (
            <div className="col-md-4 col-lg-3" key={invoice.id}>
              <button
                className="btn btn-light w-100 p-0 text-start"
                onClick={() => handleOpenInvoice(invoice)}
                style={{ cursor: "pointer" }}
                type="button"
              >
                <div className="card shadow-sm h-100">
                  <img
                    alt="invoice"
                    className="card-img-top"
                    src={
                      invoice.thumbnailUrl ||
                      "https://placehold.co/600x800?text=Invoice"
                    }
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="fw-bold text-truncate">{invoice.title}</h6>
                    <p className="text-muted small mb-0">
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
