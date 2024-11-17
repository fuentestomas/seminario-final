import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonFab, IonFabButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon,  IonFab, IonFabButton, IonLabel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage {

  slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(
    private router: Router
  ) {
    addIcons({ add });
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

}
