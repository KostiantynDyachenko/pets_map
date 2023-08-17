import clsx from "clsx"

export default function Heart({width, height, fill, stroke, strokeWidth}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={clsx(fill, stroke)}
      viewBox="0 0 18 18"
    >
      <path
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M2.534 8.715c-.76-2.372.129-5.085 2.62-5.887A4.255 4.255 0 019 3.474c1.03-.797 2.53-1.066 3.84-.646 2.49.802 3.384 3.515 2.625 5.887C14.282 12.477 9 15.374 9 15.374S3.757 12.52 2.534 8.715z"
        clipRule="evenodd"
      />
    </svg>
  )
}

Heart.defaultProps = {
  width: '20',
  height: '20',
  fill: 'fill-transparent',
  stroke: 'stroke-white',
  strokeWidth: '2'
}
