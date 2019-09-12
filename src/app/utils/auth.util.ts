import { environment } from 'src/environments/environment';

export class AuthUtil {

    static set(auth: any): void {
        localStorage.setItem(environment.authKey, auth);
    }

    static get(): any {
        const auth = localStorage.getItem(environment.authKey);
        
        if (!auth)
            return null;

        return JSON.parse(auth);
    }
}