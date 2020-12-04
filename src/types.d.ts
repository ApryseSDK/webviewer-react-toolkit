import { CoreControls } from '@pdftron/webviewer';

export {}; // Required to indicate that the file is a module.

declare global {
  interface Window {
    CoreControls: typeof CoreControls;
  }
}
