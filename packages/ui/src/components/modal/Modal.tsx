import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/30 backdrop-blur-sm"
    >
      <div className="bg-[var(--tg-theme-bg-color)] text-[var(--tg-text)] rounded-lg shadow-lg w-[90%] max-w-md p-4 relative">
        <div className="flex items-center justify-between mb-5 text-[var(--tg-theme-text-color)]">
          {title && (
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-[var(--tg-muted)] hover:text-red-400"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}