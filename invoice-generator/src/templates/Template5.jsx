import "./Template5.css";

const Template5 = ({ formattedData }) => {
  return (
    <div className="template5 invoice-template">
      <h1 className="text-center">Hóa đơn</h1>
      <hr />
      <div className="d-flex justify-content-between my-5">
        <div>
          <p>
            <strong>Từ:</strong>
          </p>
          <p>{formattedData.companyName}</p>
        </div>
        <div>
          <p>
            <strong>Đến:</strong>
          </p>
          <p>{formattedData.billingName}</p>
        </div>
      </div>
      <h2 className="text-center mt-5">
        Số tiền: {formattedData.formattedTotal}
      </h2>
    </div>
  );
};

export default Template5;
