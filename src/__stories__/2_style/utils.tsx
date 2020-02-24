import React, { MouseEvent } from 'react';
import { useToast } from '../../hooks';

async function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; // avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const successful = document.execCommand('copy');
  if (!successful) throw new Error();

  document.body.removeChild(textArea);
}

export function useCopy() {
  const toast = useToast();

  return (text: string) => {
    return (e: MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const copyFunc = navigator.clipboard
        ? () => navigator.clipboard.writeText(text)
        : () => fallbackCopyTextToClipboard(text);
      copyFunc().then(
        () => {
          toast.remove();
          toast.add({
            heading: 'Copied Value',
            children: <code style={{ whiteSpace: 'pre-wrap' }}>{text}</code>,
            toastType: 'info',
            timeout: 2000,
          });
        },
        err => {
          toast.add({
            heading: 'Error Copying Text',
            children: <code style={{ whiteSpace: 'pre-wrap' }}>{err}</code>,
            toastType: 'error',
            timeout: 2000,
          });
        },
      );
    };
  };
}

export function getTitle(group: string) {
  let words = group.split(/(?=[A-Z])/);
  words = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(' ');
}
