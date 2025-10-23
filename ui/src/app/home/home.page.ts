import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonFab, IonFabButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add, business } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OffersService } from 'src/services/offers/offers.service';
import { em } from '@fullcalendar/core/internal-common';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon,  IonFab, IonFabButton, IonLabel, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomePage {

  slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    centeredSlides: true
  };

  myJobs: any[] = [];
  indirectOffers: any[] = [];
  pendingOffers: any[] = [];
  aceptedJobs: any[] = [];

  role!: string | null;

  userId!: string | undefined;

  constructor(
    private router: Router,
    private offersService: OffersService
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    let user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user._id;
    if (this.role === 'employer') {
      this.offersService.getEmployerOffersHome(this.userId).subscribe({
        next: (res) => {
          console.log('Offers response (raw):', res);

          // Diagnostic checks
          const offersValue = res?.offers;
          console.log('offers typeof:', typeof offersValue, 'isArray:', Array.isArray(offersValue), 'constructor:', offersValue?.constructor?.name);

          // Helper to coerce the incoming value to a proper array for *ngFor
          const coerceToArray = (val: any) => {
            if (!val) return [];
            if (Array.isArray(val)) return val;
            if (typeof val === 'string') {
              // maybe a JSON string
              try { return JSON.parse(val); } catch (e) { return [val]; }
            }
            if (typeof val === 'object') {
              // Convert plain object with numeric keys or keyed items to array of values
              try { return Object.values(val); } catch (e) { return [] }
            }
            return [val];
          };

          this.myJobs = coerceToArray(res?.offers);
          this.aceptedJobs = coerceToArray(res?.acceptedOffers);

          console.log('After coercion - myJobs length:', this.myJobs.length, 'accepted length:', this.aceptedJobs.length);
        },
        error: (err) => {
          console.error('Error fetching offers:', err);
        }
      });
    } else if (this.role === 'worker') {
      this.offersService.getWorkerOffersHome(this.userId).subscribe({
        next: (res) => {
          this.indirectOffers = res.indirectOffers;
          this.pendingOffers = res.pendingOffers;
          this.aceptedJobs = res.acceptedOffers;
        }
      });
    }
  }

  createIndirectOffer() {
    this.router.navigate(['indirect-offer']);
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

  goToOffer(item: any) {
    this.router.navigate(['offer', item._id]);
  }

}
