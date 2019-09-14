import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskPipe } from './mask.pipe';


@NgModule({
  declarations: [
		MaskPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaskPipe
  ]
})
export class PipesModule { }
