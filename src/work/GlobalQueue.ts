export type Unit = () => Promise<any>

class QueueItem {
  constructor(
    public id: symbol,
    public unit: Unit
  ) {
  }
  
  process() {
    return this.unit();
  }

}

class GlobalQueue {
  private queue: Array<QueueItem>;
  private queueRefs: Map<symbol, QueueItem>;
  private _listeners: Map<symbol, (result: any) => void>
  private _isWorking: boolean;

  constructor() {
    this.queue = [];
    this.queueRefs = new Map();
    this._listeners = new Map();
    this._isWorking = false;
  }

  process<T>(unit: Unit): Promise<T> {
    const id = Symbol();
    const item = new QueueItem(id, unit);
    this.queue.push(item);
    this.queueRefs.set(id, item);
    const p: Promise<T> = new Promise((resolve) => {
      this._listeners.set(id, (result: T) => {
        resolve(result)
      })
    })
    this.flush();
    return p;
  }

  private async flush() {
    if (this.queue.length === 0 || this._isWorking) {
      return;
    }
    this._isWorking = true;
    const item = this.queue.shift();
    const result = await item?.process();
    const id = item?.id;

    const callback = this._listeners.get(id as symbol);
    callback?.(result);
    this.queueRefs.delete(id as symbol);
    this._isWorking = false;
    this.flush();
  }
}

// Singleton
export default new GlobalQueue();