export const BASE_URL = "http://localhost:8000/api/v1";

export const getInvoices = async function () {
  const res = await fetch(`${BASE_URL}/invoices`);

  const { data } = await res.json();

  return data;
};
