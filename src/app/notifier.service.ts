import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private events: any = {};
  constructor() {}

  notify(to: string, data?: any) {
    const event = this.events[to];
    if (event) {
      for (const subscriber of event) {
        subscriber.callback(data);
      }
    }
  }

  subscribe(to: string, callback: Function): string {
    let event = this.events[to];
    const subscriber = { id: uuid.v4(), callback };
    if (!event) {
      event = [];
    }
    event.push(subscriber);
    this.events[to] = event;
    return subscriber.id;
  }

  unsubscribe(id: string) {
    for (const keys in this.events) {
      this.events[keys] = this.events[keys].filter((e) => e.id !== id);
    }
  }
}
