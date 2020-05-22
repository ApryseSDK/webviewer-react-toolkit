import { useEffect, useState } from 'react';

/**
 * Will return true if the user is using keyboard navigation, or false if they
 * are using their mouse. The returned value will be true if the Tab key was
 * used more recently than mouse click, and false if not. You can also provide
 * custom behavior by passing your own observable.
 * @param observable Optional custom observable.
 */
export function useAccessibleFocus(observable: FocusObservable = tabObservable) {
  const [isUserTabbing, setIsUserTabbing] = useState(observable.value);

  useEffect(() => {
    return observable.subscribe(() => setIsUserTabbing(observable.value));
  }, [observable]);

  return isUserTabbing;
}

export interface FocusObservable {
  value: boolean;
  subscribe(subscriber: () => void): void;
}

class AccessibleFocusObservable implements FocusObservable {
  private _subscribers: (() => void)[];
  private _isUserTabbing: boolean;

  constructor() {
    this._subscribers = [];
    this._isUserTabbing = false;
  }

  get value() {
    return this._isUserTabbing;
  }

  subscribe(subscriber: () => void) {
    // If adding first subscriber, begin listening to document.
    if (this._subscribers.length === 0) {
      if (this._isUserTabbing) {
        this._tabToMouseListener();
      } else {
        this._mouseToTabListener();
      }
    }
    const exists = this._subscribers.includes(subscriber);
    if (!exists) this._subscribers.push(subscriber);
    return this._unsubscribe(subscriber);
  }

  private _unsubscribe(subscriber: () => void) {
    return () => {
      this._subscribers = this._subscribers.filter((s) => s !== subscriber);
      // If no subscribers, stop listening to document.
      if (this._subscribers.length === 0) this._removeAllListeners();
    };
  }

  private _setIsUserTabbing(isUserTabbing: boolean) {
    this._isUserTabbing = isUserTabbing;
    this._subscribers.forEach((subscriber) => subscriber());
  }

  private _handleFirstTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this._setIsUserTabbing(true);
      this._tabToMouseListener();
    }
  };

  private _handleFirstMouse = () => {
    this._setIsUserTabbing(false);
    this._mouseToTabListener();
  };

  private _tabToMouseListener() {
    window.removeEventListener('keydown', this._handleFirstTab);
    window.addEventListener('mousedown', this._handleFirstMouse);
  }

  private _mouseToTabListener() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.addEventListener('keydown', this._handleFirstTab);
  }

  private _removeAllListeners() {
    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.removeEventListener('keydown', this._handleFirstTab);
  }
}

const tabObservable = new AccessibleFocusObservable();
