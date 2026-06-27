import { useEffect, useRef } from "react";

const SIZE = 12;
const LERP = 0.08;

export function useCursorFollower() {
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    if (isTouch || isSmall) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * LERP;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * LERP;
      if (elRef.current) {
        elRef.current.style.transform = `translate(${posRef.current.x - SIZE / 2}px, ${posRef.current.y - SIZE / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return elRef;
}
