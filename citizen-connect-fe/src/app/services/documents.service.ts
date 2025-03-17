import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Documents } from '../interfaces/documents';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = 'http://localhost:4000/documents';

  constructor(
    private http: HttpClient,
    private authService: LoginService
  ) { }

  private getOptions() {
    const token = this.authService.getToken()
    return{
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })
    }
  }
  
  getDocuments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching documents:', error);
        return throwError(() => error);
      })
    )
  }

  createDocument(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error adding document:', error);
          return throwError(() => error);
        })
      );
  }
  

  getDocument(document: Documents): Observable<any> {
    return this.http.patch(`${this.apiUrl}/document/${document.documentId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching document:', error);
        return throwError(() => error);
      })
    )
  }

  delete(document: Documents): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${document.documentId}`, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error deleting document:', error);
          return throwError(() => error);
        })
      );
  }
  
}
