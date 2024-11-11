import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonAvatar, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonAvatar, IonItem, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  items = ['Javier Valicenti', 'Omar Juarez', 'Agustin Romero'];
  constructor() { }

  ngOnInit() {
    
  }

}
