import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  chatWithDocument(documentId: string, query: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { documentId, query })
      .pipe(
        catchError(error => {
          console.error('Error getting user opinions', error)
          return throwError(() => error)
        })
      )
  }
  processDocument(documentUrl: string, documentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/process-document/`, { documentUrl, documentId })
    .pipe(
      catchError(error => {
        console.error('Error getting user opinions', error)
        return throwError(() => error)
      })
    )
  }
}
