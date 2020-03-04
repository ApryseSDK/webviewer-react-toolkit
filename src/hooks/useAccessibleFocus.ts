import { useEffect, useState } from 'react';

/**
 * Will return true if the user is using keyboard navigation, or false if they
 * are using their mouse. The returned value will be true if the Tab key was
 * used more recently than mouse click, and false if not.
 */
export function useAccessibleFocus() {
  const [isUserTabbing, setIsUserTabbing] = useState(observable.isUserTabbing);

  useEffect(() => {
    return observable.subscribe(() => setIsUserTabbing(observable.isUserTabbing));
  }, []);

  return isUserTabbing;
}

class AccessibleFocusObservable {
  private _subscribers: Function[];
  private _isUserTabbing: boolean;

  constructor() {
    this._subscribers = [];
    this._isUserTabbing = false;
  }

  get isUserTabbing() {
    return this._isUserTabbing;
  }

  subscribe(subscriber: Function) {
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

  private _unsubscribe(subscriber: Function) {
    return () => {
      this._subscribers = this._subscribers.filter(s => s !== subscriber);
      // If no subscribers, stop listening to document.
      if (this._subscribers.length === 0) this._removeAllListeners();
    };
  }

  private _setIsUserTabbing(isUserTabbing: boolean) {
    this._isUserTabbing = isUserTabbing;
    this._subscribers.forEach(subscriber => subscriber());
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

const observable = new AccessibleFocusObservable();
