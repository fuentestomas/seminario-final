import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private globalService: GlobalService) {}

  getSearchWorkers(searchText: string, categoryFilter: string, proximityFilter: number): Observable<any> {
    let params = new HttpParams();
    if (searchText !== '') {
      params = params.append('searchText', encodeURIComponent(searchText));
    }
    if (categoryFilter !== '') {
      params = params.append('categoryFilter', categoryFilter);
    }
    if (proximityFilter !== null && proximityFilter !== undefined) {
      params = params.append('proximityFilter', proximityFilter.toString());
    }



    return this.globalService.getRequestWithParams(
      '/users/searchWorkers',
      params
    );
  }
}