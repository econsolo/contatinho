import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFeedbackComponent } from './input-feedback/input-feedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    InputFeedbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    InputFeedbackComponent
  ]
})
export class ComponentsModule { }
