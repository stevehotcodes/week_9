import { Component } from '@angular/core';
import { FlashmessagesService, IflashMessage } from './services/flashmessages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND-NG';
  messages:IflashMessage[]

  constructor(public flashMessagesSvc:FlashmessagesService) {
    this.messages = flashMessagesSvc.getMessages()
  }
}
