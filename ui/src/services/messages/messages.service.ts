import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private globalService: GlobalService) {}

  getChatMessages(chatId: string): Observable<any> {
    return this.globalService.getRequest(`/chat/${chatId}/messages`);
  }

  getUserChats(userId: string, role: string): Observable<any> {
    return this.globalService.getRequest(`/chat/getUserChats/${userId}/${role}`);
  }
}