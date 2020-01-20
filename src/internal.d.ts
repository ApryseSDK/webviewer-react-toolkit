/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'react-dnd-multi-backend/dist/cjs/HTML5toTouch' {
  const HTML5toTouch: any;
  export default HTML5toTouch;
}
