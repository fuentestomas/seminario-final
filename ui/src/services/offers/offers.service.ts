import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { body } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private globalService: GlobalService) {}

  getOfferById(offerId: string): Observable<any> {
    return this.globalService.getRequest(
      '/offers/' + offerId
    );
  }

  getEmployerOffersHome(userId?: string): Observable<any> {
    console.log('UserID in service:', userId);
    return this.globalService.getRequest(
      '/offers/employerOffers/' + userId
    );
  }

  getWorkerOffersHome(userId?: string): Observable<any> {
    console.log('UserID in service:', userId);
    return this.globalService.getRequest(
      '/offers/workerOffers/' + userId
    );
  }

  postCreateDirectOffer(offerData: any): Observable<any> {
    return this.globalService.postRequest(
      '/offers',
      offerData,
      new HttpParams()
    );
  }

  putAcceptOffer(offerId: string, selectedDate: string): Observable<any> {
    const body = { date: selectedDate };
    return this.globalService.putRequest(
      `/offers/accept/${offerId}`,
      body,
      new HttpParams()
    );
  }

  putRejectOffer(offerId: string): Observable<any> {
    return this.globalService.putRequest(
      `/offers/reject/${offerId}`,
      {},
      new HttpParams()
    );
  }
}