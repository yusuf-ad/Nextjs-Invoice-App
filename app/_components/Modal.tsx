"use client";

import {
  ComponentPropsWithoutRef,
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const initialValue: ModalContextType = {
  isOpen: false,
  close: () => {},
  open: () => {},
};

const ModalContext = createContext(initialValue);

function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(!isOpen);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        close,
        open,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }: { children: ReactNode }) {
  const { open } = useModal();

  return <div onClick={open}>{children}</div>;
}

function Content({
  children,
  className,
}: { children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  const { isOpen, close } = useModal();

  console.log(isOpen);

  return createPortal(
    <div
      className={`${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      } fixed inset-0 z-30 h-screen w-full overflow-y-scroll bg-black/50 transition-opacity duration-100 backdrop:blur-sm`}
    >
      <div
        className={`${
          isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        } ${className}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!,
  );
}

export { Modal, Content, useModal, Open };
