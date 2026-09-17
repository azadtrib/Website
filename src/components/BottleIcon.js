export default function BottleIcon({ color = "#1a1a1a", className = "" }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      role="img"
      aria-label="Beard oil bottle"
    >
      <rect x="44" y="18" width="32" height="26" rx="4" fill="#3a3a3a" />
      <rect x="50" y="6" width="20" height="16" rx="3" fill="#1a1a1a" />
      <rect
        x="24"
        y="44"
        width="72"
        height="140"
        rx="14"
        fill={color}
        opacity="0.92"
      />
      <rect
        x="24"
        y="44"
        width="72"
        height="140"
        rx="14"
        fill="none"
        stroke="#00000022"
        strokeWidth="1.5"
      />
      <rect
        x="34"
        y="80"
        width="52"
        height="60"
        rx="6"
        fill="#ffffff"
        opacity="0.94"
      />
    </svg>
  );
}
