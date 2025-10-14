import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private globalService: GlobalService) {}

  getAllCategories(): Observable<any> {
    return this.globalService.getRequest(
      '/categories'
    );
  }
}