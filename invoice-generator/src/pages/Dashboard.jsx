import { useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useAuth } from "../hooks/useAuth";
import { deleteInvoice, getAllInvoices } from "../services/invoiceService";
import { formatDate } from "../utils/formatDate";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const hasFetched = useRef(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const {
    BASE_URL,
    setInvoiceData,
    initialInvoiceData,
    setInvoiceTitle,
    setSelectedTemplate,
  } = useContext(AppContext);

  const fetchInvoices = useCallback(async () => {
    try {
      const data = await getAllInvoices(BASE_URL, getToken);
      setInvoices(data);
    } catch {
      // ignore
    }
  }, [BASE_URL, getToken]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      try {
        await deleteInvoice(BASE_URL, id, getToken);
        toast.success("Xóa hóa đơn thành công!");
        setInvoices(invoices.filter((inv) => inv.id !== id));
      } catch {
        toast.error("Không thể xóa hóa đơn");
      }
    }
  };

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
      id: invoice.id,
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
    <div className="py-4 container">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="mb-1 fw-bold">Bảng Điều Khiển</h2>
          <p className="mb-0 text-muted">Quản lý hóa đơn của bạn</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Create New Card */}
        <div className="col-md-4 col-lg-3">
          <button
            className="shadow-sm border-2 border-dashed w-100 h-100 btn btn-light"
            onClick={handleCreateNew}
            style={{ cursor: "pointer", minHeight: "280px" }}
            type="button"
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="d-flex align-items-center justify-content-center bg-primary mb-3 rounded-circle text-white"
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
            <div className="shadow-sm h-100 card">
              <div
                className="d-flex flex-column align-items-center justify-content-center card-body"
                style={{ minHeight: "280px" }}
              >
                <p className="text-muted">Chưa có hóa đơn nào</p>
              </div>
            </div>
          </div>
        ) : (
          invoices.map((invoice) => (
            <div className="col-md-4 col-lg-3" key={invoice.id}>
              <div className="shadow-sm h-100 card">
                <button
                  className="p-0 w-100 text-start btn btn-light"
                  onClick={() => handleOpenInvoice(invoice)}
                  style={{ cursor: "pointer" }}
                  type="button"
                >
                  <img
                    alt="hóa đơn"
                    className="card-img-top"
                    src={
                      invoice.thumbnailUrl ||
                      "https://placehold.co/600x800?text=Invoice"
                    }
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="text-truncate fw-bold">{invoice.title}</h6>
                    <p className="mb-0 text-muted small">
                      {formatDate(invoice.createdAt)}
                    </p>
                  </div>
                </button>
                <div className="bg-transparent border-top-0 card-footer">
                  <button
                    className="btn-outline-danger w-100 btn btn-sm"
                    onClick={(e) => handleDelete(e, invoice.id)}
                    type="button"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
