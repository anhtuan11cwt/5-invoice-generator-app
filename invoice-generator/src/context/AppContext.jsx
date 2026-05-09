import { createContext, useContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);

const initialInvoiceData = {
  bank: {
    accountHolder: "",
    accountNumber: "",
    bankName: "",
  },
  billTo: {
    address: "",
    name: "",
    phone: "",
  },
  company: {
    address: "",
    name: "",
    phone: "",
  },
  grandTotal: 0,
  invoice: {
    date: "",
    dueDate: "",
    number: "",
  },
  items: [
    {
      amount: 0,
      description: "",
      id: "item-1",
      name: "",
      quantity: 1,
      total: 0,
    },
  ],
  logo: "",
  notes: "",
  shipTo: {
    address: "",
    name: "",
    phone: "",
  },
  subtotal: 0,
  taxAmount: 0,
  taxRate: 0,
};

export const AppContextProvider = ({ children }) => {
  const BASE_URL = "http://localhost:8080";
  const [invoiceTitle, setInvoiceTitle] = useState("Hóa Đơn Mới");
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const value = {
    BASE_URL,
    initialInvoiceData,
    invoiceData,
    invoiceTitle,
    isEditingTitle,
    selectedTemplate,
    setInvoiceData,
    setInvoiceTitle,
    setIsEditingTitle,
    setSelectedTemplate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
