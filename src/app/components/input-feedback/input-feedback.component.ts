import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss'],
})
export class InputFeedbackComponent implements OnInit {

  @Input() label: string;
  @Input() type: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public getErrors(): string[] {
    return Object.getOwnPropertyNames(this.control.errors)
      .map(e => this.control.errors[e]);
  }
}
