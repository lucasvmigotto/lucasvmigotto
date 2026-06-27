import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

const MAX_OFFSET = 8;
const RADIUS = 60;

export function useMagneticButton() {
  const reducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement | null>(null);
  const transitioningRef = useRef(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < RADIUS) {
      const ratio = 1 - dist / RADIUS;
      setOffset({
        x: ((dx * ratio * (MAX_OFFSET / RADIUS) * RADIUS) / (dist || 1)) * ratio,
        y: ((dy * ratio * (MAX_OFFSET / RADIUS) * RADIUS) / (dist || 1)) * ratio,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    transitioningRef.current = true;
    setOffset({ x: 0, y: 0 });
  }, []);

  const onTransitionEnd = useCallback(() => {
    transitioningRef.current = false;
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch || reducedMotion) return;

    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("transitionend", onTransitionEnd);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("transitionend", onTransitionEnd);
    };
  }, [reducedMotion, onMouseMove, onMouseLeave, onTransitionEnd]);

  const callbackRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  const transform =
    reducedMotion || transitioningRef.current
      ? "translate(0px, 0px)"
      : `translate(${offset.x}px, ${offset.y}px)`;

  return {
    ref: callbackRef,
    style: { transform, transition: transitioningRef.current ? "transform 0.4s ease" : "none" },
  };
}
