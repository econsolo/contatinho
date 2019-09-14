import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFeedbackComponent } from './input-feedback/input-feedback.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    InputFeedbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [
    InputFeedbackComponent
  ]
})
export class ComponentsModule { }
