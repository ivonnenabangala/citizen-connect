import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Discussions } from '../interfaces/discussions';
import { environment } from '../../environments/environment'; // Relative path to environments folder


@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  private topicsApiUrl = 'http://localhost:4000/topics'
  private opinionsApiUrl = 'http://localhost:4000/opinions'
  private summaryApiUrl = 'https://api.apyhub.com/ai/summarize';
  private apiToken = environment.APYHUB_API_TOKEN;

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) { }

  private getOptions() {
    const token = this.loginService.getToken()
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
  }

  getTopics(): Observable<any> {
    return this.http.get(`${this.topicsApiUrl}/all`, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error fetching discussion topics:', error);
          return throwError(() => error);
        })
      )
  }

  createTopic(question: string): Observable<any> {
    return this.http.post(`${this.topicsApiUrl}/add`, { question }, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error adding topic', error)
          return throwError(() => error)
        })
      )
  }

  deleteTopic(topic: Discussions): Observable<any> {
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
  getSummarizedOpinions(topicId: number): Observable<string> {
    const params = new HttpParams().set('topicId', topicId.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'apy-token': environment.APYHUB_API_TOKEN 
    });

    return this.http.get<{ opinion: string }[]>(`${this.opinionsApiUrl}/all`, { params }).pipe(
      map(opinions => opinions.map(op => op.opinion).join(' ')),
      switchMap(paragraph => {
        const trimmedParagraph = paragraph.slice(0, 500); // Input limits
        const requestBody = { text: trimmedParagraph };

        // console.log("Sending to APYHub:", JSON.stringify(requestBody)); 

        return this.http.post<{ data: { summary: string } }>(
          'https://api.apyhub.com/ai/summarize-text', 
          requestBody,
          { headers }
        );
      }),
      // tap(response => console.log("✅ Response from APYHub:", response)), 
      map(response => response.data.summary), 
      // tap(summary => console.log("Summarized Opinion:", summary)),
      catchError(error => {
        console.error('Error fetching or summarizing opinions', error);
        return throwError(() => error);
      })
    );
  }





  deleteOpinion(topic: Discussions): Observable<any> {
    return this.http.delete(`${this.opinionsApiUrl}/delete/${topic.opinionId}`, this.getOptions())
      .pipe(
        catchError(error => {
          console.error('Error deleting opinion', error)
          return throwError(() => error)
        }))
  }
}
