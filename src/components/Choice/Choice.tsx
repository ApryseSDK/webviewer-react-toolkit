import classnames from 'classnames';
import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAccessibleFocus, useFocus } from '../../hooks';
import { useID } from '../../hooks/useID';
import { Remove } from '../../utils';
import { Icon } from '../Icon';

export interface ChoiceProps extends Remove<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label is optional, but it is encouraged to add the `aria-label` prop if you
   * are not labeling the choice, or if label is not a string.
   */
  label?: ReactNode;
  /**
   * If true, label will appear to the left of the choice.
   */
  leftLabel?: boolean;
  /**
   * Choice is a checkbox unless radio is true, in which case it is a radio
   * button.
   */
  radio?: boolean;
  /**
   * Choice becomes a switch, rather than a checkbox or radio. It will still
   * behave as either a checkbox, or radio if `radio` is true.
   */
  isSwitch?: boolean;
  /**
   * If true, choice will be centered vertically in the content.
   */
  center?: boolean;
}

export const Choice = forwardRef<HTMLInputElement, ChoiceProps>(
  (
    { label, leftLabel, className, children, id, radio, isSwitch, center, onChange, onFocus, onBlur, ...props },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const isUserTabbing = useAccessibleFocus();
    const { focused, handleOnFocus, handleOnBlur } = useFocus(onFocus, onBlur);

    const choiceID = useID(id);

    const [checked, setChecked] = useState<boolean>(() => props.checked ?? inputRef.current?.checked ?? false);
    useEffect(() => {
      if (props.checked !== undefined) setChecked(props.checked);
    }, [props.checked]);

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (props.checked === undefined) setChecked(event.target.checked);
      onChange?.(event);
    };

    // HACK: since there is no way to detect that a radio button is being
    // unchecked due to form activity, we subscribe all radio buttons to an
    // observable. When checked changes and props.checked is undefined, this
    // will trigger the observable which will ping all other subscribers to
    // check if they have become unchecked, and if so change their internal
    // state.
    useEffect(() => {
      if (props.name && radio) {
        return observable.subscribe(props.name, () => {
          if (inputRef.current && inputRef.current.checked !== checked) {
            setChecked(inputRef.current.checked);
          }
        });
      }
      return;
    }, [checked, props.name, radio]);

    const choiceClass = classnames(
      'ui__base ui__choice',
      {
        'ui__choice--radio': radio,
        'ui__choice--leftLabel': leftLabel,
        'ui__choice--checked': checked,
        'ui__choice--disabled': props.disabled,
        'ui__choice--center': center,
      },
      className,
    );

    const inputClass = classnames('ui__choice__input', { 'ui__choice__input--switch': isSwitch });

    const checkClass = isSwitch
      ? classnames('ui__choice__input__switch', {
          'ui__choice__input__switch--checked': checked,
          'ui__choice__input__switch--focus': isUserTabbing && focused,
        })
      : classnames('ui__choice__input__check', {
          'ui__choice__input__check--checked': checked,
          'ui__choice__input__check--focus': isUserTabbing && focused,
        });

    const labelElement = useMemo(() => {
      if (!label) return undefined;
      return (
        <label className="ui__choice__label" htmlFor={choiceID}>
          {label}
        </label>
      );
    }, [choiceID, label]);

    return (
      <span className={choiceClass}>
        {leftLabel ? labelElement : undefined}
        <span className={inputClass}>
          {isSwitch ? (
            <div className={checkClass}>
              <div className="ui__choice__input__toggle" />
            </div>
          ) : (
            <div className={checkClass}>
              {checked && !radio ? <Icon icon="Check" className="ui__choice__input__icon" /> : undefined}
            </div>
          )}
          <input
            {...props}
            id={choiceID}
            type={radio ? 'radio' : 'checkbox'}
            onChange={handleOnChange}
            ref={inputRef}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            {children}
          </input>
        </span>
        {!leftLabel ? labelElement : undefined}
      </span>
    );
  },
);

/**
 * Observable helper to notify radio buttons that they have become unchecked.
 */
class RadioObservable {
  private _subscribers: { name: string; subscriber: () => void }[];

  constructor() {
    this._subscribers = [];
  }

  subscribe(name: string, subscriber: () => void) {
    this._trigger(name);

    this._subscribers.push({ name, subscriber });
    return this._unsubscribe(subscriber);
  }

  private _trigger(name: string) {
    this._subscribers.forEach((s) => {
      if (name === s.name) s.subscriber();
    });
  }

  private _unsubscribe(subscriber: () => void) {
    return () => {
      this._subscribers = this._subscribers.filter((s) => s.subscriber !== subscriber);
    };
  }
}

const observable = new RadioObservable();
