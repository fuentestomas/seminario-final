import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonAvatar, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { MessagesService } from 'src/services/messages/messages.service';

@Component({
  selector: 'app-chats',
  templateUrl: 'chats.page.html',
  styleUrls: ['chats.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonLabel, IonAvatar, IonItem, CommonModule],
})
export class ChatsPage implements OnInit {

  items: any[] = [];

  user!: any;
  userId!: any;
  role!: any;
  
  constructor(
    private router: Router,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = this.user._id;

    console.log('Retrieved userId:', this.userId);

    this.role = localStorage.getItem('role');

    this.messagesService.getUserChats(this.userId, this.role).subscribe({
      next: (res) => {
        console.log(res);
        this.items = res;
      }
    });
  }

  goToChat(item: any) {
    let employer;
    let worker;

    if (this.role === 'employer') {
      employer = { _id: this.userId, fullName: this.user.fullName };
      worker = item.chatUser;
      worker._id = item.chatUser.id;
    }
    else {
      worker = { _id: this.userId, fullName: this.user.fullName };
      employer = item.chatUser;
      employer._id = item.chatUser.id;
    }

    console.log('Navigating to chat with:', { employer, worker });

    this.router.navigate(['chat', item._id], { state: { employer: employer, worker: worker } });
  }

}
