import { useEffect, useState } from "react";

const TOAST_EVENT = "app:toast";
const TOAST_DURATION = 4000;

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;

    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setMessage(null), TOAST_DURATION);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-fade-in fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-md border border-border bg-surface-raised px-4 py-3 font-body text-[0.875rem] text-text-primary shadow-card"
    >
      {message}
    </div>
  );
}
