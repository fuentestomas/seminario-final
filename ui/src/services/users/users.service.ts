import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private globalService: GlobalService) {}

  loginUser(credentials: any): Observable<any> {
    return this.globalService.postRequest(
      '/users/login',
      credentials,
      new HttpParams()
    );
  }

  registerUser(userData: any): Observable<any> {
    return this.globalService.postRequest(
      '/users/register',
      userData,
      new HttpParams()
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.globalService.getRequest(`/users/${userId}`);
  }

  getUserScores(userId: string): Observable<any> {
    return this.globalService.getRequest(`/scores/user/${userId}`);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.globalService.putRequest(
      `/users/${userId}`,
      userData,
      new HttpParams()
    );
  }
}
