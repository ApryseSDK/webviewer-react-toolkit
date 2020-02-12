import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface OverlayProps {
  /**
   * Prevent clicks from going through the overlay. This is useful for blocking
   * modals or panels.
   */
  blockClicks?: boolean;
  /**
   * Make the overlay dark when open. This can be used in combination with
   * `blockClicks` to visually indicate that you are unable to click through the
   * overlay.
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
      props.blockClicks ? 'ui__overlay--blocking' : '',
      props.darkOverlay ? 'ui__overlay--dark' : '',
    ].filter(Boolean);

    addClass(...classList);
    if (elements.size === 0 && elements.add(id).size === 1) appendElement();

    return () => {
      removeClass(...classList);
      if (elements.size === 1 && elements.delete(id)) removeElement();
    };
  };

  return (({ children, blockClicks, className, darkOverlay }) => {
    useEffect(() => add({ blockClicks, className, darkOverlay }), [blockClicks, className, darkOverlay]);
    return createPortal(children, overlayRoot);
  }) as FC<OverlayProps>;
}

export const Overlay = generateOverlayLayer();
