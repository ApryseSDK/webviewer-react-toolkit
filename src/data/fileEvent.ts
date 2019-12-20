import { File } from './file';

export interface FileEventInit {
  bubbles?: boolean;
  cancelable?: boolean;
}

export type FileEventType = 'change' | 'rotate';

export type FileEventListener = (event: FileEvent) => void;

export class FileEvent {
  private _type: FileEventType;
  private _target: File;
  private _bubbles: boolean;
  private _cancelable: boolean;
  private _defaultPrevented: boolean;

  constructor(type: FileEventType, target: File, fileEventInit: FileEventInit = {}) {
    this._type = type;
    this._target = target;
    this._bubbles = fileEventInit.bubbles ?? true;
    this._cancelable = fileEventInit.cancelable ?? false;
    this._defaultPrevented = false;
  }

  get type() {
    return this._type;
  }

  get target() {
    return this._target;
  }

  get bubbles() {
    return this._bubbles;
  }

  get cancellable() {
    return this._cancelable;
  }

  get defaultPrevented() {
    return this._defaultPrevented;
  }

  preventDefault() {
    if (!this._cancelable) this._defaultPrevented = true;
  }

  stopImmediatePropagation() {
    this._bubbles = false;
  }
}
