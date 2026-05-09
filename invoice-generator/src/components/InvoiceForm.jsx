import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const InvoiceForm = () => {
  const { invoiceData, setInvoiceData } = useAppContext();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInvoiceData((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (section, field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSameAsBilling = (checked) => {
    if (!checked) return;
    setInvoiceData((prev) => ({
      ...prev,
      shipTo: {
        ...prev.billTo,
      },
    }));
  };

  useEffect(() => {
    const randomNumber = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split("T")[0];
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    const dueDateStr = dueDate.toISOString().split("T")[0];

    setInvoiceData((prev) => ({
      ...prev,
      invoice: {
        ...prev.invoice,
        date: today,
        dueDate: dueDateStr,
        number: randomNumber,
      },
    }));
  }, [setInvoiceData]);

  const handleAddItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          amount: 0,
          description: "",
          id: Date.now(),
          name: "",
          quantity: 1,
          total: 0,
        },
      ],
    }));
  };

  const handleDeleteItem = (index) => {
    if (invoiceData.items.length === 1) return;
    const updatedItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.items];
    updatedItems[index][field] = value;
    const qty = Number(updatedItems[index].quantity);
    const amount = Number(updatedItems[index].amount);
    updatedItems[index].total = qty * amount;
    setInvoiceData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const calculateTotals = useCallback(() => {
    const subtotal = invoiceData.items.reduce(
      (acc, item) => acc + Number(item.total),
      0,
    );
    const taxAmount = subtotal * (Number(invoiceData.taxRate) / 100);
    const grandTotal = subtotal + taxAmount;
    setInvoiceData((prev) => ({
      ...prev,
      grandTotal,
      subtotal,
      taxAmount,
    }));
  }, [invoiceData.items, invoiceData.taxRate, setInvoiceData]);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  return (
    <div>
      <div className="mb-4">
        <h5>Logo Công Ty</h5>
        <input
          accept="image/*"
          className="form-control"
          onChange={handleLogoUpload}
          type="file"
        />
        {invoiceData.logo && (
          <img
            alt="Logo"
            className="mt-2"
            src={invoiceData.logo}
            style={{ maxHeight: "80px" }}
          />
        )}
      </div>

      <div className="mb-4">
        <h5>Thông Tin Công Ty</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control"
              onChange={(e) => handleChange("company", "name", e.target.value)}
              placeholder="Tên Công Ty"
              type="text"
              value={invoiceData.company.name}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              onChange={(e) => handleChange("company", "phone", e.target.value)}
              placeholder="Số Điện Thoại"
              type="text"
              value={invoiceData.company.phone}
            />
          </div>
          <div className="col-12">
            <input
              className="form-control"
              onChange={(e) =>
                handleChange("company", "address", e.target.value)
              }
              placeholder="Địa Chỉ Công Ty"
              type="text"
              value={invoiceData.company.address}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>Thông Tin Khách Hàng</h5>
        <div className="mb-3">
          <h6 className="fw-bold">Bill To (Người Mua)</h6>
          <div className="row g-2">
            <div className="col-md-6">
              <input
                className="form-control"
                onChange={(e) => handleChange("billTo", "name", e.target.value)}
                placeholder="Tên Khách Hàng"
                type="text"
                value={invoiceData.billTo.name}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                onChange={(e) =>
                  handleChange("billTo", "phone", e.target.value)
                }
                placeholder="Số Điện Thoại"
                type="text"
                value={invoiceData.billTo.phone}
              />
            </div>
            <div className="col-12">
              <input
                className="form-control"
                onChange={(e) =>
                  handleChange("billTo", "address", e.target.value)
                }
                placeholder="Địa Chỉ"
                type="text"
                value={invoiceData.billTo.address}
              />
            </div>
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            id="sameBilling"
            onChange={(e) => handleSameAsBilling(e.target.checked)}
            type="checkbox"
          />
          <label className="form-check-label" htmlFor="sameBilling">
            Giống địa chỉ thanh toán
          </label>
        </div>

        <div>
          <h6 className="fw-bold">Ship To (Địa Chỉ Giao Hàng)</h6>
          <div className="row g-2">
            <div className="col-md-6">
              <input
                className="form-control"
                onChange={(e) => handleChange("shipTo", "name", e.target.value)}
                placeholder="Tên Người Nhận"
                type="text"
                value={invoiceData.shipTo.name}
              />
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                onChange={(e) =>
                  handleChange("shipTo", "phone", e.target.value)
                }
                placeholder="Số Điện Thoại"
                type="text"
                value={invoiceData.shipTo.phone}
              />
            </div>
            <div className="col-12">
              <input
                className="form-control"
                onChange={(e) =>
                  handleChange("shipTo", "address", e.target.value)
                }
                placeholder="Địa Chỉ Giao Hàng"
                type="text"
                value={invoiceData.shipTo.address}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>Thông Tin Hóa Đơn</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) =>
                handleChange("invoice", "number", e.target.value)
              }
              placeholder="Số Hóa Đơn"
              type="text"
              value={invoiceData.invoice.number}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) => handleChange("invoice", "date", e.target.value)}
              type="date"
              value={invoiceData.invoice.date}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) =>
                handleChange("invoice", "dueDate", e.target.value)
              }
              placeholder="Hạn Thanh Toán"
              type="date"
              value={invoiceData.invoice.dueDate}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>Danh Sách Sản Phẩm</h5>
        {invoiceData.items.map((item, index) => (
          <div className="border rounded p-3 mb-3" key={item.id}>
            <div className="row g-2 align-items-end">
              <div className="col-md-3">
                <input
                  className="form-control"
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  placeholder="Tên Sản Phẩm"
                  type="text"
                  value={item.name}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  min="1"
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  placeholder="Số Lượng"
                  type="number"
                  value={item.quantity}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  min="0"
                  onChange={(e) =>
                    handleItemChange(index, "amount", e.target.value)
                  }
                  placeholder="Đơn Giá"
                  type="number"
                  value={item.amount}
                />
              </div>
              <div className="col-md-2">
                <input
                  className="form-control"
                  placeholder="Tổng"
                  readOnly
                  type="text"
                  value={item.total}
                />
              </div>
              <div className="col-md-2">
                {invoiceData.items.length > 1 && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteItem(index)}
                    type="button"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
              <div className="col-12">
                <input
                  className="form-control"
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  placeholder="Mô Tả"
                  type="text"
                  value={item.description}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          className="btn btn-outline-primary"
          onClick={handleAddItem}
          type="button"
        >
          <Plus className="me-2" size={18} />
          Thêm Sản Phẩm
        </button>
      </div>

      <div className="mb-4">
        <h5>Thông Tin Ngân Hàng</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) =>
                handleChange("bank", "accountHolder", e.target.value)
              }
              placeholder="Tên Chủ Tài Khoản"
              type="text"
              value={invoiceData.bank.accountHolder}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) =>
                handleChange("bank", "accountNumber", e.target.value)
              }
              placeholder="Số Tài Khoản"
              type="text"
              value={invoiceData.bank.accountNumber}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              onChange={(e) => handleChange("bank", "bankName", e.target.value)}
              placeholder="Tên Ngân Hàng"
              value={invoiceData.bank.bankName}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5>Thuế & Ghi Chú</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              max="100"
              min="0"
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  taxRate: e.target.value,
                }))
              }
              placeholder="Thuế Suất (%)"
              type="number"
              value={invoiceData.taxRate}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Tạm Tính"
              readOnly
              type="text"
              value={invoiceData.subtotal.toFixed(2)}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Tổng Cộng"
              readOnly
              type="text"
              value={invoiceData.grandTotal.toFixed(2)}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              onChange={(e) =>
                setInvoiceData((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              placeholder="Ghi Chú..."
              rows={4}
              value={invoiceData.notes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
