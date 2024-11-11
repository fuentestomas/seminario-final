import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonLabel, IonAvatar, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonList, IonLabel, IonAvatar, IonItem, CommonModule],
})
export class Tab1Page implements OnInit {

  items = ['Javier Valicenti', 'Omar Juarez', 'Agustin Romero'];
  
  constructor() { }

  ngOnInit() {
    
  }

}
