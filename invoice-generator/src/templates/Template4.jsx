import "./Template4.css";

const Template4 = ({ formattedData }) => {
  return (
    <div className="template4 invoice-template">
      <div className="template4-banner">
        <h1>Hóa đơn doanh nghiệp</h1>
        <p>Số: {formattedData.invoiceNumber}</p>
      </div>
      <div className="p-5">
        <h4>{formattedData.companyName}</h4>
        <p>{formattedData.companyAddress}</p>
        <hr />
        <h5>Tổng phải trả: {formattedData.formattedTotal}</h5>
      </div>
    </div>
  );
};

export default Template4;
