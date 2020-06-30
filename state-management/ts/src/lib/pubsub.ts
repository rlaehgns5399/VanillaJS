export default class PubSub {
  public events: { [K in string]: Array<Function> };

  constructor() {
    this.events = {};
  }

  subscribe(event: string, callback: Function): number {
    const self: this = this;

    if (!self.events[event]) {
      self.events[event] = [];
    }

    return self.events[event].push(callback);
  }

  publish(event: string, data: Object = {}): Array<Function> {
    const self: this = this;

    if (!self.events[event]) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }
}