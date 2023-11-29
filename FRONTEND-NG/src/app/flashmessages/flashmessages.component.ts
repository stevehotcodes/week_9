import { Component, Input } from '@angular/core';
import { IflashMessage } from '../services/flashmessages.service';

@Component({
  selector: 'app-flashmessages',
  templateUrl: './flashmessages.component.html',
  styleUrls: ['./flashmessages.component.css']
})
export class FlashmessagesComponent {
  @Input() message!:IflashMessage
}
