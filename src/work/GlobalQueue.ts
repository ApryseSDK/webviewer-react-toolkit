export type Unit = () => Promise<any>

const MAX_ACTIVE_UNITS = 1;

class QueueItem {
  public cancelled: boolean;

  constructor(
    public id: symbol,
    public unit: Unit
  ) {
    this.cancelled = false;
  }
  
  process() {
    return this.unit();
  }

  cancel() {
    this.cancelled = true;
  }

}

class GlobalQueue {
  private queue: Array<QueueItem> = [];
  private queueRefs: Map<symbol, QueueItem> = new Map();
  private _listeners: Map<symbol, (result: any) => void> = new Map()
  private _queueLength = 0;
  private _activeUnits = 0;

  process<T>(unit: Unit): [Promise<T>, () => void] {
    const id = Symbol();
    const item = new QueueItem(id, unit);
    this.queue.push(item);
    this.queueRefs.set(id, item);
    const p: Promise<T> = new Promise((resolve) => {
      this._listeners.set(id, (result: T) => {
        resolve(result)
      })
    })
    this._queueLength++;
    this.flush();
    return [p, () => this.cancel(id)];
  }

  // marks a unit of work as cancelled.
  // The unit will not be processed and will be removed
  // from the queue when no other work is going on
  private cancel(id: symbol) {
    const ref = this.queueRefs.get(id);
    ref?.cancel();
    this.flush();
  }

  private cleanup() {
    this.queue = this.queue.filter(item => {
      const { cancelled, id } = item;
      if (cancelled) {
        this.queueRefs.delete(id);
        return false
      }
      return true;
    })
    this._queueLength = this.queue.length;
  }

  private async flush() {

    if (this._activeUnits === MAX_ACTIVE_UNITS) return;

    if (this._queueLength === 0) {
      this.cleanup()
      return;
    }
    
    const item = this.queue.shift();
    if (item?.cancelled) {
      this._queueLength--;
      this.flush();
      return;
    }
    
    // If no items left, return
    if (!item) {
      this.cleanup()
      return;
    }

    this._activeUnits++;
    
    const result = await item?.process();
    const id = item?.id;

    const callback = this._listeners.get(id as symbol);
    callback?.(result);
    this.queueRefs.delete(id as symbol);
    this._activeUnits--;
    this._queueLength--;
    this.flush();
  }
}

// Singleton
export default new GlobalQueue();