import { FormControl } from '@angular/forms';

export class CustomValidator {

    static onlyText(control: FormControl) {
        var text: string = control.value;
        if (!text.match('[a-zA-Z]*')) return { onlyText: true };
        return null;
    }

    static equals(control1: FormControl) {
        return (control2: FormControl) => {
            return control1.value === control2.value ? null : { equals: true };
        }
    }
}