import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export default function Dialog({ title, onClose, drawer = false, children }) {
  const ref = useRef();
  useEffect(() => {
    const trigger = document.activeElement;
    const dialog = ref.current;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = old;
      if (trigger?.isConnected) trigger.focus();
      else document.querySelector('[aria-label^="Open cart"]')?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={drawer ? "dialog drawer" : "dialog"}
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <h2 id="dialog-title">{title}</h2>
        <button autoFocus aria-label="Close dialog" onClick={onClose}>
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
