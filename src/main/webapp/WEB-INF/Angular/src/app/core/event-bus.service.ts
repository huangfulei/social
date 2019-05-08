import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  // subject can send any type of data, can be changed to specific type
  private subject = new Subject<any>();

  constructor() {
  }

  // the event type can also just be a string
  on(event: Events, action: any): Subscription {
    return this.subject
      .pipe(
        filter((e: EmitEvent) => {
          return e.name === event;
        }),
        map((event: EmitEvent) => {
          return event.value;
        })
      )
      .subscribe(action);
  }

  emit(event: EmitEvent) {
    this.subject.next(event);
  }
}

export class EmitEvent {

  constructor(public name: any, public value?: any) {
  }

}

export enum Events {
  UserLogIn
}
