import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface OverlayProps {
  /**
   * Optional className for the overlay container.
   */
  className?: string;
}

function generateOverlayLayer() {
  let currentId = 1;
  const elements = new Set<number>();
  const classes: { [className: string]: number } = {};

  const overlayRoot = document ? document.createElement('div') : undefined;
  overlayRoot?.classList.add('ui__base', 'ui__overlay');

  const appendElement = () => {
    if (document && overlayRoot) document.body.appendChild(overlayRoot);
  };
  const removeElement = () => {
    if (document && overlayRoot) document.body.removeChild(overlayRoot);
  };

  const addClass = (className?: string) => {
    if (!className) return;
    overlayRoot?.classList.add(className);
    classes[className] = (classes[className] || 0) + 1;
  };

  const removeClass = (className?: string) => {
    if (!className) return;
    classes[className] = (classes[className] || 0) - 1;
    if (classes[className] <= 0) {
      delete classes[className];
      overlayRoot?.classList.remove(className);
    }
  };

  const add = (props: OverlayProps) => {
    const id = currentId++;

    addClass(props.className);
    elements.add(id);
    if (elements.size === 1) appendElement();

    return () => {
      elements.delete(id);
      removeClass(props.className);
      if (elements.size === 0) removeElement();
    };
  };

  return (({ children, className }) => {
    useEffect(() => add({ className }), [className]);
    if (!overlayRoot) return null;
    return createPortal(children, overlayRoot);
  }) as FC<OverlayProps>;
}

export const Overlay = generateOverlayLayer();
