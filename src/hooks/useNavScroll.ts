import { useCallback, useEffect, useRef, useState } from "react";

export function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef(0);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 80);
      rafRef.current = 0;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  return scrolled;
}
