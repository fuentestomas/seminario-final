import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonIcon, IonFooter, IonButton, IonInput, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket/socket.service';
import { MessagesService } from 'src/services/messages/messages.service';

interface Message {
  id: number;
  text: string;
  sent: boolean;
}

@Component({
  selector: 'app-chat-screen',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonIcon, IonFooter, IonButton, IonInput, IonBackButton, IonButtons]
})
export class ChatPage {
  messages: any[] = [];
  newMessage = '';

  employer!: any;
  worker!: any;

  role!: any;
  userId!: any;

  messageSubscription: any;

  chatId!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService,
    private messagesService: MessagesService
  ) {
    addIcons({ send })
  }
  
  ngOnInit() {
    this.role = localStorage.getItem('role');
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user._id;

    this.activatedRoute.paramMap.subscribe(params => {
      this.chatId = params.get('id');
      
      if (this.chatId) {
        this.socketService.joinRoom(this.chatId);
        this.messagesService.getChatMessages(this.chatId).subscribe({
          next: (res) => {
            this.messages = res;
          }
        }); 
      }
      
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras.state && nav.extras.state['worker']) {
        this.worker = { ...nav.extras.state['worker'], ...this.worker };
      }
      if (nav?.extras.state && nav.extras.state['employer']) {
        this.employer = { ...nav.extras.state['employer'], ...this.employer };
      }

      this.messageSubscription = this.socketService.getMessages().subscribe(data => {
        console.log('New message received:', data);
        this.messages.push(data);
      });
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.socketService.sendMessage({
        chatId: this.chatId ? this.chatId : 'none',
        text: this.newMessage,
        userId: this.userId,
        employerId: this.employer._id,
        workerId: this.worker._id
      });
      this.newMessage = '';
    }
  }
}