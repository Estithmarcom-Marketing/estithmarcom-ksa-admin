export default function InfinitySpinner({size}: {size?: number}) {
  return (
    <svg
      width={size ?? 48}
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-main"
    >
      <style>{`
      @keyframes infinity-dash {
        0%   { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: -150; }
      }
      .infinity-path {
        stroke-dasharray: 30 120;
        animation: infinity-dash 1.4s linear infinite;
      }
      .infinity-track {
        opacity: 0.15;
      }
    `}</style>

      {/* Track */}
      <path
        className="infinity-track"
        d="M24 12 C24 6, 12 0, 6 6 C0 12, 6 18, 12 18 C18 18, 24 12, 24 12 C24 12, 30 6, 36 6 C42 6, 48 12, 42 18 C36 24, 24 18, 24 12 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Animated dash */}
      <path
        className="infinity-path"
        d="M24 12 C24 6, 12 0, 6 6 C0 12, 6 18, 12 18 C18 18, 24 12, 24 12 C24 12, 30 6, 36 6 C42 6, 48 12, 42 18 C36 24, 24 18, 24 12 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
