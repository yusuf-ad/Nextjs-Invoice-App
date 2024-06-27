import { forwardRef, ReactNode } from "react";

type OverlayProps = {
  children: ReactNode;
  isModalActive: boolean;
};

const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  ({ children, isModalActive }, ref) => {
    return (
      <div
        ref={ref}
        className={`${
          isModalActive
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } fixed inset-0 z-30 h-screen w-full bg-black/50 transition-opacity duration-100 backdrop:blur-sm`}
      >
        {children}
      </div>
    );
  },
);

Overlay.displayName = "Overlay";

export default Overlay;
