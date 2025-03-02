import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Incidents } from '../interfaces/incidents';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {
  private apiUrl = 'http://localhost:4000/incidents';
  private incidentId = 6

  constructor(
    private http: HttpClient,
    private authService: LoginService
  ) { }

  private getOptions() {
    const token = this.authService.getToken()
    return{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }
  
  getIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching incidents:', error);
        return throwError(() => error);
      })
    )
  }

  createIncident(incident: Incidents): Observable<any>{
    return this.http.post(`${this.apiUrl}/add`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }

  getIncident(incident: Incidents): Observable<any> {
    return this.http.patch(`${this.apiUrl}/incident/${this.incidentId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }

  delete(incident: Incidents): Observable<any>{
    return this.http.delete(`${this.apiUrl}/incident/${this.incidentId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }
}
