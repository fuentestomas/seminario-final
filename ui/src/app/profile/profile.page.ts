import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem, IonInput, IonButton, IonCard, IonAvatar, IonLabel, IonCardContent, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { star, starOutline, camera } from 'ionicons/icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonIcon, IonList, IonItem, IonInput, IonButton, IonCard, IonAvatar, IonLabel, IonCardContent, CommonModule, FormsModule, RouterModule, IonButtons, IonBackButton],
})
export class ProfilePage {

  isDetail: boolean = false;

  user = {
    name: 'Liam',
    lastName: 'Merlo',
    phoneNumber: '3519999999',
    address: 'Ituzaingo 484',
    currentRating: 4
  }

  profileImageUrl: SafeUrl | null = null;
  
  comments = [
    {
      firstName: 'Tomas',
      lastName: 'Fuentes',
      text: 'Excelente servicio!'
    }
  ];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ star, starOutline, camera })
  }

  ionViewWillEnter() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.isDetail = true;
        this.profileImageUrl = "../../assets/avatar.png"
      }
    });
  }

  goToOffer() {
    this.router.navigate(['offer']);
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
