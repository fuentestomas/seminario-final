import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalService {

  constructor(private http: HttpClient) { }

  public postRequest(route: string, body: string, parameters: HttpParams) {
    console.log('POST Request to:', `${environment.apiUrl}${route}`);
    return this.http.post(`${environment.apiUrl}${route}`, body, { params: parameters });
  }

  public getRequest(route: string) {
    console.log('GET Request to:', `${environment.apiUrl}${route}`);
    return this.http.get(`${environment.apiUrl}${route}`);
  }

  public getRequestWithParams(route: string, parameters: HttpParams) {
    console.log('GET Request to:', `${environment.apiUrl}${route}`);
    return this.http.get(`${environment.apiUrl}${route}`, { params: parameters });
  }

  public putRequest(route: string, body: any, parameters: HttpParams) {
    console.log('PUT Request to:', `${environment.apiUrl}${route}`);
    return this.http.put(`${environment.apiUrl}${route}`, body, { params: parameters });
  }
}
