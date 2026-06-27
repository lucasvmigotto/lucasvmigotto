const NODES = [
  { x: 120, y: 80, r: 4 },
  { x: 200, y: 40, r: 5 },
  { x: 280, y: 100, r: 3 },
  { x: 240, y: 180, r: 6 },
  { x: 320, y: 140, r: 4 },
  { x: 160, y: 200, r: 5 },
  { x: 360, y: 80, r: 3 },
] as const;

const EDGES = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 4],
  [2, 6],
  [3, 5],
  [3, 4],
  [4, 6],
  [5, 3],
] as const;

export function AbstractGeometry() {
  return (
    <svg
      viewBox="0 0 400 260"
      className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-[400px] opacity-25 pointer-events-none hidden lg:block"
      aria-hidden="true"
    >
      {EDGES.map(([a, b]) => {
        if (a === undefined || b === undefined) return null;
        const na = NODES.at(a);
        const nb = NODES.at(b);
        if (na === undefined || nb === undefined) return null;
        return (
          <line
            key={`${na.x}-${na.y}-${nb.x}-${nb.y}`}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="#1E2D4A"
            strokeWidth="1"
          />
        );
      })}
      {NODES.map((node, i) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={i === 3 ? "#5B6EF5" : "#4A5878"}
        />
      ))}
    </svg>
  );
}
