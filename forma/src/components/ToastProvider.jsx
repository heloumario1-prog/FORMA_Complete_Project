import { createContext, useContext, useEffect, useState, useRef } from "react";
const Context = createContext(() => {});
export const useToast = () => useContext(Context);
export function ToastProvider({ children }) {
  const [message, setMessage] = useState("");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  function notify(text) {
    clearTimeout(timer.current);
    setMessage(text);
    timer.current = setTimeout(() => setMessage(""), 3500);
  }
  return (
    <Context.Provider value={notify}>
      {children}
      <div
        className={"toast " + (message ? "shown" : "")}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </Context.Provider>
  );
}
