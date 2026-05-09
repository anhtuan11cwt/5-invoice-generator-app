const formatCurrency = (value = 0) => {
  return new Intl.NumberFormat("vi-VN", {
    currency: "VND",
    style: "currency",
  }).format(value);
};

export const formatInvoiceData = (invoiceData) => {
  const items = invoiceData?.items || [];

  const normalizedItems = items.map((item) => {
    const quantity = Number(item.quantity || 0);
    const rate = Number(item.rate || 0);

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
    ...invoiceData,
    formattedItems: normalizedItems.map((item) => ({
      ...item,
      formattedAmount: formatCurrency(item.amount),
      formattedRate: formatCurrency(item.rate),
    })),
    formattedSubtotal: formatCurrency(subtotal),
    formattedTax: formatCurrency(taxAmount),
    formattedTotal: formatCurrency(total),
    items: normalizedItems,
    subtotal,
    taxAmount,
    total,
  };
};
