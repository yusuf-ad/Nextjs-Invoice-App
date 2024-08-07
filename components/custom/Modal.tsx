"use client";

import {
  ComponentPropsWithoutRef,
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

  return <div onClick={close}>{children}</div>;
}

function Content({
  children,
  className,
}: { children: ReactNode } & ComponentPropsWithoutRef<"div">) {
  const { isOpen, close } = useModal();

  const overlay = useRef(null);
  // State to control the rendering of the portal only on the client side
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component has mounted, set isMounted to true
  }, []);

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

  // Only render the portal if isMounted is true
  return isMounted
    ? createPortal(
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
      )
    : null;
}

export { Modal, Content, useModal, Open, Close };
