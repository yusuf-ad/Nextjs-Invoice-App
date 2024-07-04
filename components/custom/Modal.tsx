"use client";

import {
  ComponentPropsWithoutRef,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Overlay from "./Overlay";

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

  return (
    <button className="cursor-pointer" onClick={open}>
      {children}
    </button>
  );
}

function Close({ children }: { children: ReactElement }) {
  const { close } = useModal();

  return cloneElement(children, { onClick: close });
}

function Content({
  children,
  className,
}: { children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  const { isOpen, close } = useModal();

  const overlay = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (overlay.current && overlay.current === event.target) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return createPortal(
    <Overlay isOpen={isOpen} ref={overlay}>
      <div
        className={`${
          isOpen
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        } relative ${className}`}
      >
        {children}
      </div>
    </Overlay>,
    document.getElementById("modal-root")!,
  );
}

export { Modal, Content, useModal, Open, Close };
