import { File } from './file';

export interface FileEventInit {
  /** Will this event bubble up to on change listeners. */
  bubbles?: boolean;
  /** Can listeners call `preventDefault` on this event. */
  cancelable?: boolean;
  /** All event listeners. */
  listeners?: FileEventListenersObj;
  /** The default actions once the event has finished propagating. */
  eventDefault?: Function;
}

export enum FileEventType {
  /** Triggered when the documentObj is updated. */
  Rotate = 'onrotate',
  /** Triggered when the documentObj is updated. */
  DocumentObjChange = 'ondocumentobjchange',
  /** Triggered when the fileObj is updated. */
  FileObjChange = 'onfileobjchange',
  /** Triggered when the thumbnail is updated. */
  ThumbnailChange = 'onthumbnailchange',
  /** Triggered when the name is updated. */
  NameChange = 'onnamechange',
  /** Change is always fired after every other event, unless stopPropagation was called. */
  Change = 'onchange',
}

export type FileEventListener = (event: FileEvent) => void;

export type FileEventListenersObj = Partial<{ [type in FileEventType]: FileEventListener[] }>;

export class FileEvent {
  private _type: FileEventType;
  private _originalType: FileEventType;
  private _target: File;
  private _bubbles: boolean;
  private _cancelable: boolean;
  private _defaultPrevented: boolean;
  private _isPropagationStopped: boolean;
  private _isImmediatePropagationStopped: boolean;
  private _eventDefault?: Function;
  private _listeners?: FileEventListenersObj;

  constructor(type: FileEventType, target: File, fileEventInit: FileEventInit = {}, originalType = type) {
    this._type = type;
    this._originalType = originalType;
    this._target = target;
    this._bubbles = fileEventInit.bubbles ?? true;
    this._cancelable = fileEventInit.cancelable ?? true;
    this._defaultPrevented = !fileEventInit.eventDefault;

    this._isPropagationStopped = false;
    this._isImmediatePropagationStopped = false;

    this._eventDefault = fileEventInit.eventDefault;
    this._listeners = fileEventInit.listeners;

    this._dispatch();
  }

  /**
   * The type of this event.
   */
  get type() {
    return this._type;
  }

  /**
   * The type of the first event fired. Useful if you are an on change listener
   * and you want to know the original event type.
   */
  get originalType() {
    return this._originalType;
  }

  /** The target file of this event. */
  get target() {
    return this._target;
  }

  /** Indicates whether the event will bubble to on change listeners. */
  get bubbles() {
    return this._bubbles;
  }

  /** Indicates whether the event is able to have default prevented. */
  get cancellable() {
    return this._cancelable;
  }

  /**
   * If true, event will not complete its default actions once it has
   * propagated. You can call `preventDefault` to turn this to true.
   */
  get defaultPrevented() {
    return this._defaultPrevented;
  }

  /** Once event has propagated, prevent default actions from completing. */
  preventDefault() {
    if (this._cancelable) {
      this._defaultPrevented = true;
      this._eventDefault = undefined;
    }
  }

  /** Prevent event from propagating on change listeners. */
  stopPropagation() {
    this._isPropagationStopped = true;
  }

  /**
   * Prevent event from calling any other listeners, including those listeners
   * in the current event.
   */
  stopImmediatePropagation() {
    this._isImmediatePropagationStopped = true;
  }

  private _dispatch() {
    const thisTypeListeners = this._listeners?.[this.type] ?? [];

    for (let index = 0; index < thisTypeListeners.length; index++) {
      if (this._isImmediatePropagationStopped) break;
      const listener = thisTypeListeners[index];
      listener(this);
    }

    // Call default if event is already onchange, or if propagation has been
    // stopped. Otherwise, give the eventDefault to an onchange event so that
    // onchange listeners have an opportunity to receive the event prior to it
    // firing the default.
    if (this._isPropagationStopped || this.type === FileEventType.Change) {
      this._eventDefault?.();
    } else if (!this._isPropagationStopped) {
      const fileEventInit: FileEventInit = {
        bubbles: this.bubbles,
        cancelable: this.cancellable,
        eventDefault: this._eventDefault,
        listeners: this._listeners,
      };
      new FileEvent(FileEventType.Change, this.target, fileEventInit, this.originalType);
    }
  }
}
