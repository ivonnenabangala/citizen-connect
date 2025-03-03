import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Discussions } from '../interfaces/discussions';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  private topicsApiUrl = 'http://localhost:4000/topics'
  private opinionsApiUrl = 'http://localhost:4000/opinions'

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  private getOptions(){
    const token = this.loginService.getToken()
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  getTopics(): Observable<any>{
    return this.http.get(`${this.topicsApiUrl}/all`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error fetching discussion topics:', error);
        return throwError(() => error);
      })
    )
  }

  createTopic(topic:Discussions): Observable<any> {
    return this.http.post(`${this.topicsApiUrl}/add`, topic, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error adding topic', error)
        return throwError(() => error)
      })
    )
  }

  deleteTopic(topic:Discussions): Observable<any> {
    return this.http.delete(`${this.topicsApiUrl}/delete/${topic.topicId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error deleting topic', error)
        return throwError(() => error)
      }))
  }

  addOpinion(topicId: number, opinion: string): Observable<any> {
    return this.http.post(`${this.opinionsApiUrl}/add`, { topicId, opinion }, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error adding opinion', error);
          return throwError(() => error);
        })
      );
  }
  

  getUserOpinions(): Observable<any> {
    return this.http.get(`${this.opinionsApiUrl}/user/opinions`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error getting user opinions', error)
        return throwError(() => error)
      })
    )
  }

  deleteOpinion(topic:Discussions): Observable<any> {
    return this.http.delete(`${this.opinionsApiUrl}/delete/${topic.opinionId}`, this.getOptions())
    .pipe(
      catchError(error => {
        console.error('Error deleting opinion', error)
        return throwError(() => error)
      }))
  }
}
