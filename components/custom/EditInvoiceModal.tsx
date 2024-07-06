"use client";

import EditInvoiceForm from "./EditInvoiceForm";
import { Close, Content, Modal, Open } from "./Modal";
import ButtonCloseModal from "./ButtonCloseModal";

function EditInvoiceModal({ currentInvoice }: { currentInvoice: any }) {
  return (
    <Modal>
      <Open>
        <div className="btn-sm cursor-pointer bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70">
          Edit
        </div>
      </Open>

      <Content className="top-20 h-full w-full overflow-y-scroll bg-white p-6 pb-36 transition-all duration-300 dark:bg-skin-mirage2 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:top-0 xl:max-w-4xl xl:pl-36">
        <h2 className="text-3xl font-bold text-skin-black">
          Edit <span className="text-skin-shipCove">#</span>
          {currentInvoice?.invoiceId}
        </h2>

        <Close>
          <ButtonCloseModal />
        </Close>

        <EditInvoiceForm currentInvoice={currentInvoice} />
      </Content>
    </Modal>
  );
}

export default EditInvoiceModal;
