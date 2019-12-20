import { File } from './file';

export interface FileEventInit {
  cancelable?: boolean;
  listeners?: FileEventListener[];
  eventDefault?: Function;
}

export enum FileEventType {
  Rotate = 'onrotate',
  DocumentObjChange = 'ondocumentobjchange',
  FileObjChange = 'onfileobjchange',
  ThumbnailChange = 'onthumbnailchange',
}

export type FileEventListener = (event: FileEvent) => void;

export class FileEvent {
  private _type: FileEventType;
  private _target: File;
  private _cancelable: boolean;
  private _isPropagationStopped: boolean;
  private _defaultPrevented: boolean;

  constructor(type: FileEventType, target: File, fileEventInit: FileEventInit = {}) {
    this._type = type;
    this._target = target;
    this._cancelable = fileEventInit.cancelable ?? false;
    this._isPropagationStopped = false;
    this._defaultPrevented = false;

    const { eventDefault, listeners = [] } = fileEventInit;

    for (let index = 0; index < listeners.length; index++) {
      if (this._isPropagationStopped) break;
      const listener = listeners[index];
      listener(this);
    }

    if (this.defaultPrevented) return;
    eventDefault?.();
  }

  get type() {
    return this._type;
  }

  get target() {
    return this._target;
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
    this._isPropagationStopped = true;
  }
}
