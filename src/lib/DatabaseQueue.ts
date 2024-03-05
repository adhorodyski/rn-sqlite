export class DatabaseQueue {
  listeners = new Map();
  listenerId = 0;

  subscribe(callback: (params: any) => void) {
    const id = ++this.listenerId;
    this.listeners.set(id, callback);

    // Return an unsubscribe function
    return () => {
      this.listeners.delete(id);
    };
  }

  getSubscribers() {
    return Array.from(this.listeners.values());
  }
}
