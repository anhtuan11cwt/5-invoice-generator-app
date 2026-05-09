import "./Template2.css";

const Template2 = ({ formattedData }) => {
  return (
    <div className="template2 invoice-template">
      <div className="template2-header">
        <h1>HÓA ĐƠN</h1>
        <div>
          <p>#{formattedData.invoiceNumber}</p>
          <p>{formattedData.invoiceDate}</p>
        </div>
      </div>

      <div className="template2-section">
        <div>
          <h5>TỪ</h5>
          <p>{formattedData.companyName}</p>
          <p>{formattedData.companyPhone}</p>
          <p>{formattedData.companyAddress}</p>
        </div>
        <div>
          <h5>THANH TOÁN</h5>
          <p>{formattedData.billingName}</p>
          <p>{formattedData.billingAddress}</p>
        </div>
      </div>

      <table className="template2-table">
        <thead>
          <tr>
            <th>Mặt hàng</th>
            <th>SL</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {formattedData.formattedItems?.map((item, index) => (
            <tr key={item.id ?? index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.formattedRate}</td>
              <td>{item.formattedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="template2-total">
        <p>Tạm tính: {formattedData.formattedSubtotal}</p>
        <p>Thuế: {formattedData.formattedTax}</p>
        <h3>Tổng cộng: {formattedData.formattedTotal}</h3>
      </div>

      <div className="template2-footer">
        <p>{formattedData.notes}</p>
      </div>
    </div>
  );
};

export default Template2;
