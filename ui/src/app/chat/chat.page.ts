import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonIcon, IonFooter, IonButton, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

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
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonIcon, IonFooter, IonButton, IonInput]
})
export class ChatPage {
  messages: Message[] = [
    { id: 1, text: "Hola!", sent: false },
    { id: 2, text: "Hola! Como estas?", sent: true },
    { id: 3, text: "Estoy bien, gracias por preguntar. Y vos?", sent: false },
    { id: 4, text: "Todo bien. Trabajando en algunos proyectos.", sent: true },
  ];
  newMessage = '';

  constructor() {
    addIcons({ send })
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ id: this.messages.length + 1, text: this.newMessage, sent: true });
      this.newMessage = '';
    }
  }
}