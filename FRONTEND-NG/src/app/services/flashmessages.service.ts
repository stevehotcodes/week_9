import { Injectable } from '@angular/core';

export interface IflashMessage {
  type: 'error' | 'success' | 'info'
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class FlashmessagesService {

  constructor() { }
  private messages:IflashMessage[] = []

  

  getMessages() {
    return this.messages
  }

  pushMessage (message:IflashMessage) {
    this.messages.push(message)
      setTimeout(() => {
        this.messages.shift()
      }, 7000);
  }
}
