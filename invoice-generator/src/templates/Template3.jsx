import "./Template3.css";

const Template3 = ({ formattedData }) => {
  return (
    <div className="template3 invoice-template">
      <div className="template3-top">
        <div>
          <h1>Hóa đơn</h1>
          <p>Thanh toán cao cấp</p>
        </div>
        <div className="template3-badge">BILL</div>
      </div>
      <div className="template3-content">
        <h3>{formattedData.companyName}</h3>
        <p>{formattedData.companyAddress}</p>
        <hr />
        <h4>Thanh toán: {formattedData.billingName}</h4>
        <p>{formattedData.billingAddress}</p>
        <h2 className="text-end mt-5">
          Tổng cộng: {formattedData.formattedTotal}
        </h2>
      </div>
    </div>
  );
};

export default Template3;
