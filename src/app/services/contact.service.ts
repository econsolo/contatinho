import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) { }

  public post(contact: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contact);
  }

  public put(contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${contact.id}`, contact);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  public get(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public find(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

}
