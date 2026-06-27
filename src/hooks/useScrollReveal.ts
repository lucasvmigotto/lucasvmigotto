import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

interface ScrollRevealOptions {
  threshold?: number;
  staggerDelay?: number;
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const observedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = observedRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, options?.threshold]);

  const ref = useCallback((node: HTMLElement | null) => {
    observedRef.current = node;
  }, []);

  const getChildDelay = useCallback(
    (index: number): string => {
      if (reducedMotion || isVisible) return "0ms";
      const delay = (options?.staggerDelay ?? 80) * index;
      return `${delay}ms`;
    },
    [reducedMotion, isVisible, options?.staggerDelay],
  );

  return { ref, isVisible: reducedMotion || isVisible, getChildDelay };
}
