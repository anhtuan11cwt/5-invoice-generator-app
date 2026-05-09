import { forwardRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Template1 from "../templates/Template1";

const InvoicePreview = forwardRef((_props, ref) => {
  const { selectedTemplate } = useContext(AppContext);

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 />;
      default:
        return <Template1 />;
    }
  };

  return <div ref={ref}>{renderTemplate()}</div>;
});

export default InvoicePreview;
