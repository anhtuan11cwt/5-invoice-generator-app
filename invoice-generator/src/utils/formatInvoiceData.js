const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(value);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("vi-VN");
};

export const formatInvoiceData = (invoiceData) => {
  const items = invoiceData?.items || [];

  const normalizedItems = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const rate = Number(item.amount || 0);

    return {
      ...item,
      amount: quantity * rate,
      quantity,
      rate,
    };
  });

  const subtotal = normalizedItems.reduce((acc, item) => acc + item.amount, 0);

  const taxRate = Number(invoiceData?.taxRate || 0);

  const taxAmount = subtotal * (taxRate / 100);

  const total = subtotal + taxAmount;

  return {
    accountHolderName: invoiceData?.bank?.accountHolder,
    accountNumber: invoiceData?.bank?.accountNumber,
    billingAddress: invoiceData?.billTo?.address,

    billingName: invoiceData?.billTo?.name,
    billingPhone: invoiceData?.billTo?.phone,
    companyAddress: invoiceData?.company?.address,
    companyName: invoiceData?.company?.name,
    companyPhone: invoiceData?.company?.phone,

    formattedItems: normalizedItems.map((item) => ({
      ...item,
      formattedAmount: formatCurrency(item.amount),
      formattedRate: formatCurrency(item.rate),
    })),
    formattedSubtotal: formatCurrency(subtotal),
    formattedTax: formatCurrency(taxAmount),
    formattedTotal: formatCurrency(total),
    ifscCode: invoiceData?.bank?.bankName,
    invoiceDate: formatDate(invoiceData?.invoice?.date),
    invoiceDueDate: formatDate(invoiceData?.invoice?.dueDate),

    invoiceNumber: invoiceData?.invoice?.number,
    items: normalizedItems,
    logo: invoiceData?.logo,

    notes: invoiceData?.notes,
    shippingAddress: invoiceData?.shipTo?.address,

    shippingName: invoiceData?.shipTo?.name,
    shippingPhone: invoiceData?.shipTo?.phone,
    subtotal,
    taxAmount,
    taxRate: invoiceData?.taxRate,
    total,
  };
};
