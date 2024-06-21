function InvoiceAddress({ address }) {
  return (
    <div className={`space-y-2 text-left text-xs text-skin-baliHai`}>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.postCode}</p>
      <p>{address.country}</p>
    </div>
  );
}

export default InvoiceAddress;
