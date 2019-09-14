import { FormControl, Validators } from '@angular/forms';

export class CustomValidator {

    static msg_password_dont_match: string = 'As senhas não conferem';

    static equals(control1: FormControl, msg: string) {
        return (control2: FormControl) => {
            return control1.value === control2.value ? null : { equals: msg };
        }
    }

    static required(control: FormControl) {
        if (Validators.required(control)) {
            return { required: 'Campo obrigatório' };
        }
        return null;
    }

    static email(control: FormControl) {
        if (control.value && Validators.email(control)) {
            return { required: 'E-mail inválido' };
        }
        return null;
    }


    static maxLength(maxlength: number) {
        return (control: FormControl) => {
            if (control.value && control.value.length > maxlength) {
                return { maxlength: `Máximo de ${maxlength} caracteres` };
            }
            return null;
        }
    }

    static minLength(minlength: number) {
        return (control: FormControl) => {
            if (control.value && control.value.length < minlength) {
                return { minlength: `Mínimo de ${minlength} caracteres` };
            }
            return null;
        }
    }
}