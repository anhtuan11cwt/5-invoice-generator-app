import { forwardRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { formatInvoiceData } from "../utils/formatInvoiceData";
import { templateComponents } from "../utils/invoiceTemplates";

const InvoicePreview = forwardRef((_props, ref) => {
  const { selectedTemplate, invoiceData } = useContext(AppContext);
  const formattedData = formatInvoiceData(invoiceData);

  const SelectedTemplate =
    templateComponents[selectedTemplate] || templateComponents.template1;

  return (
    <div ref={ref}>
      <SelectedTemplate formattedData={formattedData} />
    </div>
  );
});

export default InvoicePreview;
