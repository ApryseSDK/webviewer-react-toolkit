import React, { SVGProps } from 'react';

export function Download(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M19 9L15 9 15 3 9 3 9 9 5 9 12 17zM4 19H20V21H4z" />
    </svg>
  );
}
