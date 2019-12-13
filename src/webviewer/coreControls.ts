let coreControlsResolver: (value?: unknown) => void;
const coreControlsPromise = new Promise(r => {
  coreControlsResolver = r;
});

export const init = () => {
  if (typeof window !== 'undefined') {
    if (document.getElementById('CC')) return;

    const src = '/lib/core/CoreControls.js';

    const script = document.createElement('script');
    script.async = true;

    script.src = src;
    script.id = 'CC';
    script.type = 'application/javascript';

    script.onload = () => {
      window.CoreControls.setWorkerPath('/lib/core');
      window.CoreControls.disableEmbeddedJavaScript();
      coreControlsResolver();
    };

    document.head.appendChild(script);
  }
};

const coreControls = async () => {
  await coreControlsPromise;
  return window.CoreControls;
};

export default coreControls;
