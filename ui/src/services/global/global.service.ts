import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class GlobalService {

  constructor(private http: HttpClient) { }

  public postRequest(route: string, body: string, parameters: HttpParams) {
    this.http.post(route, body, { params: parameters });
  }

  public getRequest(route: string) {
    this.http.get(route);
  }
}
