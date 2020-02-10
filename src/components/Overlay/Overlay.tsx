import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface OverlayProps {
  /**
   * Allow user to click on things through the overlay.
   */
  allowClickThrough?: boolean;
  /**
   * Make the overlay dark when open.
   */
  darkOverlay?: boolean;
  /**
   * Optional className for the overlay container.
   */
  className?: string;
}

function generateOverlayLayer() {
  let currentId = 0;
  const elements = new Set<number>();
  const classes: { [className: string]: number } = {};

  const overlayRoot = document.createElement('div');
  overlayRoot.classList.add('ui__base', 'ui__overlay');

  const appendElement = () => document.body.appendChild(overlayRoot);
  const removeElement = () => document.body.removeChild(overlayRoot);

  const addClass = (...classNames: string[]) => {
    overlayRoot.classList.add(...classNames);
    classNames.forEach(className => (classes[className] = (classes[className] || 0) + 1));
  };

  const removeClass = (...classNames: string[]) => {
    classNames.forEach(className => {
      classes[className] = (classes[className] || 0) - 1;
      if (classes[className] <= 0) {
        delete classes[className];
        overlayRoot.classList.remove(className);
      }
    });
  };

  const add = (props: OverlayProps) => {
    const id = currentId++;
    const classList = [
      props.className || '',
      props.allowClickThrough ? 'ui__overlay--clickthrough' : '',
      props.darkOverlay ? 'ui__overlay--dark' : '',
    ].filter(Boolean);

    addClass(...classList);
    if (elements.size === 0 && elements.add(id).size === 1) appendElement();

    return () => {
      removeClass(...classList);
      if (elements.size === 1 && elements.delete(id)) removeElement();
    };
  };

  return (({ children, ...props }) => {
    useEffect(() => add(props), [props]);
    return createPortal(children, overlayRoot);
  }) as FC<OverlayProps>;
}

export const Overlay = generateOverlayLayer();
