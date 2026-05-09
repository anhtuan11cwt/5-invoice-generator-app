import "./Template1.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatInvoiceData } from "../utils/formatInvoiceData";

const Template1 = () => {
  const { invoiceData } = useContext(AppContext);
  const data = formatInvoiceData(invoiceData);

  return (
    <div className="template1">
      {/* HEADER */}
      <div className="template1-header">
        <div>
          {data.logo && (
            <img alt="logo" className="template1-logo" src={data.logo} />
          )}
          <h2>{data.companyName}</h2>
          <p>{data.companyPhone}</p>
          <p>{data.companyAddress}</p>
        </div>
        <div className="text-end">
          <h1 className="invoice-title">HÓA ĐƠN</h1>
          <p>
            <strong>Số:</strong> {data.invoiceNumber}
          </p>
          <p>
            <strong>Ngày:</strong> {data.invoiceDate}
          </p>
          <p>
            <strong>Hạn:</strong> {data.invoiceDueDate}
          </p>
        </div>
      </div>

      {/* BILLING */}
      <div className="template1-address-grid">
        <div>
          <h5>Địa chỉ thanh toán</h5>
          <p>{data.billingName}</p>
          <p>{data.billingPhone}</p>
          <p>{data.billingAddress}</p>
        </div>
        <div>
          <h5>Địa chỉ giao hàng</h5>
          <p>{data.shippingName}</p>
          <p>{data.shippingPhone}</p>
          <p>{data.shippingAddress}</p>
        </div>
      </div>

      {/* ITEMS */}
      <table className="table template1-table">
        <thead>
          <tr>
            <th>Mặt hàng</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.formattedItems?.map((item, index) => (
            <tr key={item.id ?? index}>
              <td>
                <div>{item.name}</div>
                <small className="text-muted">{item.description}</small>
              </td>
              <td>{item.quantity}</td>
              <td>{item.formattedRate}</td>
              <td>{item.formattedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TOTALS */}
      <div className="template1-total-section">
        <div className="template1-total-box">
          <div className="d-flex justify-content-between mb-2">
            <span>Tạm tính</span>
            <span>{data.formattedSubtotal}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Thuế ({data.taxRate}%)</span>
            <span>{data.formattedTax}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Tổng cộng</span>
            <span>{data.formattedTotal}</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="template1-footer">
        <div>
          <h5>Thông tin ngân hàng</h5>
          <p>{data.accountHolderName}</p>
          <p>{data.accountNumber}</p>
          <p>{data.ifscCode}</p>
        </div>
        <div>
          <h5>Ghi chú</h5>
          <p>{data.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default Template1;
