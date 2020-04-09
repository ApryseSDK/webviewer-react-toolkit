import React, { SVGProps } from 'react';

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M4 6H20V8H4zM4 11H20V13H4zM4 16H20V18H4z" />
    </svg>
  );
}
