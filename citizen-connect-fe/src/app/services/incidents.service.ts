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
  private apiUrl = 'http://51.20.7.110/incidents';
  private incidentId = 6

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
  
  getIncidents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching incidents:', error);
        return throwError(() => error);
      })
    )
  }

  // createIncident(incident: Incidents): Observable<any>{
  //   return this.http.post(`${this.apiUrl}/add`, incident, this.getOptions())
  //   .pipe(
  //     catchError(error => {
  //       console.error('Error fetching polls:', error);
  //       return throwError(() => error);
  //     })
  //   )
  // }
  createIncident(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, formData, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error reporting incident:', error);
          return throwError(() => error);
        })
      );
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

  delete(incident: Incidents): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${incident.incidentId}`, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error deleting incident:', error);
          return throwError(() => error);
        })
      );
  }
  
}
