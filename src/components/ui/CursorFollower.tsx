import { useEffect, useRef } from "react";

const SIZE = 12;
const LERP = 0.08;

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const isSmall = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isTouch || isSmall) return;

    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * LERP;
      pos.current.y += (target.current.y - pos.current.y) * LERP;
      if (el) {
        el.style.transform = `translate(${pos.current.x - SIZE / 2}px, ${pos.current.y - SIZE / 2}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-follower"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: "50%",
        border: "1px solid rgba(91,110,245,0.4)",
        background: "rgba(91,110,245,0.08)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
}
