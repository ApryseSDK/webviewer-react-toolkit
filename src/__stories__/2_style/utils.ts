import { MouseEvent } from 'react';

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed'; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    if (!successful) throw new Error();
    alert(`Copied value: ${text}`);
  } catch (err) {
    console.error('Could not copy text: ', err);
  }

  document.body.removeChild(textArea);
}

export function copy(text: string) {
  return (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!navigator.clipboard) {
      return fallbackCopyTextToClipboard(text);
    }
    navigator.clipboard.writeText(text).then(
      () => alert(`Copied value: ${text}`),
      err => console.error('Could not copy text: ', err),
    );
  };
}

export function getTitle(group: string) {
  let words = group.split(/(?=[A-Z])/);
  words = words.map(w => w.charAt(0).toUpperCase() + w.slice(1));
  return words.join(' ');
}
