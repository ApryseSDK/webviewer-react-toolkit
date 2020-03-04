import React, { SVGProps } from 'react';

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" {...props}>
      <path d="M5.67,8.35a.44.44,0,0,0,.66,0L9.93,4a.3.3,0,0,0,0-.35A.4.4,0,0,0,9.6,3.5H2.4a.4.4,0,0,0-.35.18.3.3,0,0,0,0,.35Z" />
    </svg>
  );
}
