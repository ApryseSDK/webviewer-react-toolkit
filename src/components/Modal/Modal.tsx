import classnames from 'classnames';
import React, { AriaAttributes, FC, HTMLAttributes, MouseEvent, ReactNode, useEffect, useMemo } from 'react';
import { useUnmountDelay } from '../../hooks';
import { getStringId } from '../../utils';
import { ButtonGroup } from '../ButtonGroup';
import { FocusTrap } from '../FocusTrap';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Overlay } from '../Overlay';

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
  /**
   * Modal does not have a max width.
   */
  fullWidth?: boolean;
  /**
   * Provide alongside `onClose` for localized accessibility.
   * @default "Close"
   */
  closeLabel?: AriaAttributes['aria-label'];
  /** @default "dialog" */
  role?: HTMLAttributes<HTMLDivElement>['role'];
  /** @default true */
  'aria-modal'?: AriaAttributes['aria-atomic'];
}

/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */

export const Modal: FC<ModalProps> = ({
  closeOnBackgroundClick,
  closeOnEscape,
  heading,
  open,
  onClose,
  fullWidth,
  closeLabel = 'Close',
  children,
  buttonGroup,
  className,
  role = 'dialog',
  'aria-modal': ariaModal = true,
  ...props
}) => {
  const { mounted } = useUnmountDelay(open);

  const headingId = useMemo(() => getStringId('modal_heading'), []);
  const bodyId = useMemo(() => getStringId('modal_body'), []);

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
    'ui__modal__wrapper--fullWidth': fullWidth,
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
            <div className="ui__modal__paddingFix">
              <div
                aria-labelledby={headingId}
                aria-describedby={bodyId}
                {...props}
                className={modalClass}
                role={role}
                aria-modal={ariaModal}
              >
                <div className="ui__modal__top">
                  <div className="ui__modal__top__heading" id={headingId}>
                    {heading}
                  </div>
                  {onClose ? (
                    <IconButton className="ui__modal__top__close" onClick={onClose} aria-label={closeLabel}>
                      <Icon icon="Close" />
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
            </div>
          </FocusTrap>
        ) : (
          undefined
        )}
      </div>
    </Overlay>
  );
};
