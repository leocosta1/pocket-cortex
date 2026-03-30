import type { SVGAttributes } from 'react';

export function DragIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M21 11H3V9H21V11M21 13H3V15H21V13Z" />
    </svg>
  );
}
