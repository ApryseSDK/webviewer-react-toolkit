import classnames from 'classnames';
import React, { FC, HTMLAttributes, MouseEvent, ReactNode, useEffect, useMemo } from 'react';
import { useUnmountDelay } from '../../hooks';
import { Close } from '../../icons';
import { ButtonGroup } from '../ButtonGroup';
import { FocusTrap } from '../FocusTrap';
import { IconButton } from '../IconButton';
import { Overlay } from '../Overlay';
import { getStringId } from '../../utils';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Heading to display at the top of the modal.
   */
  heading: ReactNode;
  /**
   * The primary body content of the modal.
   */
  children: ReactNode;
  /**
   * Content, generally buttons, can be passed to this prop in order to render
   * them within a special button group section at the bottom of the modal.
   */
  buttonGroup?: ReactNode;
  /**
   * If given, modal will fire `onClose` (if provided) when the background is
   * clicked.
   */
  closeOnBackgroundClick?: boolean;
  /**
   * If given, modal will fire `onClose` (if provided) when escape key is
   * pressed.
   */
  closeOnEscape?: boolean;
  /**
   * Modal opens when true.
   */
  open?: boolean;
  /**
   * If given, modal will have a close button, and clicking it will fire this
   * callback function.
   * @param event Either a mouse event (background or close button clicked) or
   * a keyboard event (escape key pressed).
   */
  onClose?(event: KeyboardEvent | MouseEvent): void;
}

/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */

export const Modal: FC<ModalProps> = ({
  closeOnBackgroundClick,
  closeOnEscape,
  heading,
  open,
  onClose,
  children,
  buttonGroup,
  className,

  ...props
}) => {
  const { mounted } = useUnmountDelay(open);

  const headingId = useMemo(() => getStringId('modal_heading', 8), []);
  const bodyId = useMemo(() => getStringId('modal_body', 8), []);

  useEffect(() => {
    if (open && closeOnEscape && onClose) {
      const listener = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose(event);
      };
      window.addEventListener('keydown', listener);
      return () => window.removeEventListener('keydown', listener);
    }
    return;
  }, [closeOnEscape, onClose, open]);

  const backgroundIsButton = !!(closeOnBackgroundClick && onClose);

  const modalWrapperClass = classnames('ui__base ui__modal__wrapper', {
    'ui__modal__wrapper--closed': !open,
  });

  const modalClass = classnames('ui__modal', className);

  const bodyClass = classnames('ui__modal__body', {
    'ui__modal__body--noButton': !buttonGroup,
  });

  return (
    <Overlay>
      <div
        role={backgroundIsButton ? 'button' : undefined}
        className={modalWrapperClass}
        onClick={backgroundIsButton ? onClose : undefined}
      >
        {mounted ? (
          <FocusTrap focusLastOnUnlock locked>
            <div
              {...props}
              className={modalClass}
              role="dialog"
              aria-modal={true}
              aria-labelledby={headingId}
              aria-describedby={bodyId}
            >
              <div className="ui__modal__top">
                <div className="ui__modal__top__heading" id={headingId}>
                  {heading}
                </div>
                {onClose ? (
                  <IconButton className="ui__modal__top__close" onClick={onClose} aria-label="Close">
                    <Close />
                  </IconButton>
                ) : (
                  undefined
                )}
              </div>
              <div className={bodyClass} id={bodyId}>
                {children}
              </div>
              {buttonGroup ? <ButtonGroup className="ui__modal__buttonGroup">{buttonGroup}</ButtonGroup> : undefined}
            </div>
          </FocusTrap>
        ) : (
          undefined
        )}
      </div>
    </Overlay>
  );
};
