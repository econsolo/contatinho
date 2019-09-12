import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forms-error-message',
  templateUrl: './forms-error-message.component.html',
  styleUrls: ['./forms-error-message.component.scss'],
})
export class FormsErrorMessageComponent implements OnInit {

  @Input() message : string = "";
  @Input() showIf : boolean = false;

  constructor() { }

  ngOnInit() {}

}
