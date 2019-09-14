import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    
  private apiUrl: string = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  public login(auth: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, auth);
  }

  public forgotPassword(email: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, email);
  }

  public resetPassword(passwords: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password`, passwords);
  }
}
