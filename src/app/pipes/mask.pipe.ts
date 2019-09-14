import { Pipe, PipeTransform } from '@angular/core';
import { MaskUtil } from '../utils/mask.util';

@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const mask = args[0];

    if (value.length !== mask.split('').filter(m => m === '#').length)
      throw Error('O tamanho do valor não bate com a quantidade de hashes (#)');
    
    let newValue = '';
    let valueArray = value.split('');

    for (let i = 0; i < mask.length; i++) {
      if (!valueArray.length) break;

      if (mask[i] == '#')
        newValue += valueArray.shift();
      else
        newValue += mask[i];
    }
    return newValue;
  }

}
