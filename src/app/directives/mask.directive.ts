import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MaskUtil } from '../utils/mask.util';

@Directive({
  selector: '[mask]'
})
export class MaskDirective {

  @Input() mask: string;

  constructor(private element: ElementRef) { }

  @HostListener('input', ['$event'])
  public onInputChange(event: any): void {
    if (event.inputType == 'deleteContentBackward')
      return;

    const initalValue = this.element.nativeElement.value;

    this.element.nativeElement.value = MaskUtil.format(this.mask, initalValue);
  }
}
