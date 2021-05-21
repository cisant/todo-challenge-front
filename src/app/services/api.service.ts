import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getHttpOptions() {
    const options = {
      headers: new HttpHeaders(this.getHeaders()),
      withCredentials: false,
    };
    return options;
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    return headers;
  }

  getTodos(): Observable<any> {
    const options = this.getHttpOptions();
    return this.http.get(environment.baseurl + '/todos', options);
  }

  addTodo(todo: any): Observable<any> {
    const options = this.getHttpOptions();
    return this.http.put(
      environment.baseurl + '/todo',
      JSON.stringify(todo),
      options
    );
  }

  changeStatus(id: string): Observable<any> {
    const options = this.getHttpOptions();
    return this.http.post(
      environment.baseurl + '/todo',
      JSON.stringify({ id }),
      options
    );
  }

  generateTodos(): Observable<any> {
    const options = this.getHttpOptions();
    return this.http.post(
      environment.baseurl + '/generate-todos',
      null,
      options
    );
  }

  authorize(password): Observable<any> {
    const options = this.getHttpOptions();
    return this.http.post(
      environment.baseurl + '/authorize',
      { password },
      options
    );
  }
}
