"use client";

import ButtonCloseModal from "./ButtonCloseModal";
import ButtonNewInvoice from "./ButtonNewInvoice";
import CreateInvoiceForm from "./CreateInvoiceForm";
import { Close, Content, Modal, Open } from "./Modal";

function NewInvoiceModal() {
  return (
    <Modal>
      <Open>
        <ButtonNewInvoice />
      </Open>
      <Content className="top-20 h-full w-full overflow-y-scroll bg-white p-6 pb-36 transition-all duration-300 dark:bg-skin-mirage2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:top-0 xl:max-w-4xl xl:pl-36">
        <h2 className="text-3xl font-bold text-skin-black">New Invoice</h2>

        <Close>
          <ButtonCloseModal />
        </Close>

        <CreateInvoiceForm />
      </Content>
    </Modal>
  );
}

export default NewInvoiceModal;
