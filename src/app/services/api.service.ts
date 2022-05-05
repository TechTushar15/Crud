import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postUserData(data: any) {
    console.log('Data', data);
    // Here we are passing the endpoints from gorest api to post data
    return this.http.post<any>('https://gorest.co.in/public/v2/users', data);
  }
  getUserData() {
      // Here we are passing the endpoints from gorest api to get all data
    return this.http.get<any>('https://gorest.co.in/public/v2/users');
  }
}
