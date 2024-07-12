function InvoiceAddress({ address }: { address: any }) {
  return (
    <div className={`min-w-36 space-y-2 text-left text-xs text-skin-baliHai`}>
      <p>{address.street}</p>
      <p>{address.city}</p>
      <p>{address.postCode}</p>
      <p>{address.country}</p>
    </div>
  );
}

export default InvoiceAddress;
