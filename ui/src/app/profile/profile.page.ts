import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem, IonInput, IonButton, IonCard, IonAvatar, IonLabel, IonCardContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { star, starOutline, camera } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonIcon, IonList, IonItem, IonInput, IonButton, IonCard, IonAvatar, IonLabel, IonCardContent, CommonModule, FormsModule],
})
export class ProfilePage {

  user = {
    name: 'Liam',
    lastName: 'Merlo',
    phoneNumber: '3519999999',
    address: 'Ituzaingo 484',
    currentRating: 4
  }
  
  comments = [
    {
      firstName: 'Tomas',
      lastName: 'Fuentes',
      text: 'Excelente servicio!'
    }
  ];
  
  constructor(private router: Router) {
    addIcons({ star, starOutline, camera })
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
