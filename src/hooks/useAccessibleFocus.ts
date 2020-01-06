import { useEffect, useState } from 'react';

/**
 * Will return a boolean is true if the user is using keyboard navigation. It
 * will become false if they use their mouse.
 */
export default function useAccessibleFocus() {
  const [isUserTabbing, setIsUserTabbing] = useState(observable.getCurrentValue());

  useEffect(() => {
    const subscriber = () => setIsUserTabbing(observable.getCurrentValue());
    const unsubscribe = observable.subscribe(subscriber);
    return unsubscribe;
  }, []);

  return isUserTabbing;
}

class AccessibleFocusObservable {
  private _subscribers: Function[];
  private _isUserTabbing: boolean;

  constructor() {
    this._subscribers = [];
    this._isUserTabbing = false;
    window.addEventListener('keydown', this._handleFirstTab);
  }

  getCurrentValue() {
    return this._isUserTabbing;
  }

  subscribe(subscriber: Function) {
    const exists = this._subscribers.includes(subscriber);
    if (!exists) this._subscribers.push(subscriber);
    return this._unsubscribe(subscriber);
  }

  private _unsubscribe(subscriber: Function) {
    return () => {
      const index = this._subscribers.indexOf(subscriber);
      if (index !== -1) this._subscribers.splice(index, 1);
    };
  }

  private _setIsUserTabbing(isUserTabbing: boolean) {
    this._isUserTabbing = isUserTabbing;
    this._subscribers.forEach(subscriber => subscriber());
  }

  private _handleFirstTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this._setIsUserTabbing(true);

      window.removeEventListener('keydown', this._handleFirstTab);
      window.addEventListener('mousedown', this._handleFirstMouse);
    }
  };

  private _handleFirstMouse = () => {
    this._setIsUserTabbing(false);

    window.removeEventListener('mousedown', this._handleFirstMouse);
    window.addEventListener('keydown', this._handleFirstTab);
  };
}

const observable = new AccessibleFocusObservable();
