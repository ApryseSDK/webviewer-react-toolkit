import React, { SVGProps } from 'react';

export function SinglePage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M14,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z M14,9 C13.4,9 13,9 13,9 L13,4 L18,9 L14,9 Z" />
    </svg>
  );
}
