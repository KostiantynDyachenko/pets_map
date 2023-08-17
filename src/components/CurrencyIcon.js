export default function CurrencyIcon({ className }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="-0.5 -0.5 14.5 14.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="stroke-none"
        d="m6.75 13.5a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z"
        opacity="0.2"
      />
      <path
        className="fill-none"
        d="m6.75 2.81v1.12m0 5.62v1.12m0 2.81a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="fill-none"
        d="m5.06 9.56h2.53a1.41 1.41 0 0 0 0-2.81h-1.69a1.41 1.41 0 0 1 0-2.81h2.53"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}
