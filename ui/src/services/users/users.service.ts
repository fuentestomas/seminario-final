import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private globalService: GlobalService) {}

  registerUser(userData: any): Observable<any> {
    return this.globalService.postRequest(
      '/users/register',
      userData,
      new HttpParams()
    );
  }
}
