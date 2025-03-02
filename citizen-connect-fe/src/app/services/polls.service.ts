import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Polls } from '../interfaces/polls';

@Injectable({
  providedIn: 'root'
})
export class PollsService {
  private apiUrl = 'http://localhost:4000/polls';

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
  
  getPolls(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }

  createPoll(poll: Polls): Observable<any>{
    return this.http.post(`${this.apiUrl}/add`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }

  vote(pollId: number, voteType: 'yes' | 'no'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/votes/${pollId}`, {vote: voteType}, this.getOptions())
    .pipe(
      catchError(error => {
        // console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }

  delete(poll: Polls): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete/${poll.pollId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching polls:', error);
        return throwError(() => error);
      })
    )
  }
}
