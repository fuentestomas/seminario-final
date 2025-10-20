import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, IonFab, IonFabButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OffersService } from 'src/services/offers/offers.service';

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

  // myJobs = [
  //   {
  //     id: 1,
  //     title: "Arreglo baño",
  //     status: "completed",
  //     user: "Javier Valicenti - Plomero",
  //     description: "Necesito que se arregle una perdida de agua que tengo en la bañera."
  //   },
  //   {
  //     id: "isPending",
  //     title: "Instalación eléctrica cocina",
  //     status: "pending",
  //     user: "Ana García - Electricista",
  //     description: "Instalación completa de sistema eléctrico en cocina nueva, incluyendo tomacorrientes, luces y conexiones para electrodomésticos."
  //   },
  //   {
  //     id: 4,
  //     title: "Fuga de gas",
  //     status: "rejected",
  //     user: "Luis Sanchez - Gasista",
  //     description: "Se detectó una fuga de gas en la cocina, urge reparación inmediata."
  //   },
  //   {
  //     id: 5,
  //     title: "Instalación de luces en patio",
  //     status: "completed",
  //     user: "María López - Electricista",
  //     description: "Instalar 4 luces LED en el patio, con cableado subterráneo y conexión a interruptor existente."
  //   },
  //   {
  //     id: "inProgress",
  //     title: "Reparación de cañerías",
  //     status: "inProgress",
  //     user: "Juan Pérez - Plomero",
  //     description: "Las cañerías del baño están viejas y producen ruidos, necesito que se revisen y reparen."
  //   },
  //   {
  //     id: 8,
  //     title: "Revisión de caldera",
  //     status: "completed",
  //     user: "Carlos Rodríguez - Gasista",
  //     description: "Revisión anual de la caldera de gas, incluyendo limpieza y control de funcionamiento."
  //   },
  //   {
  //     id: 9,
  //     title: "Cambio de tomacorrientes",
  //     status: "rejected",
  //     user: "Sofía Martínez - Electricista",
  //     description: "Cambiar 3 tomacorrientes antiguos por nuevos, con conexión a tierra."
  //   },
  // ]

  // indirectOffers = [
  //   {
  //     id: 3,
  //     title: "Reparación de puerta",
  //     user: "Pedro Ramírez",
  //     description: "La puerta principal de mi casa no cierra bien, necesita ajuste y posible cambio de bisagras."
  //   },
  //   {
  //     id: 9,
  //     title: "Cambio de tomacorrientes",
  //     user: "Sofía Martínez",
  //     description: "Cambiar 3 tomacorrientes antiguos por nuevos, con conexión a tierra."
  //   },
  // ]

  // pendingOffers = [
  //   {
  //     id: "isPending",
  //     title: "Construcción de armario a medida",
  //     status: "pending",
  //     user: "Laura Gómez",
  //     description: "Necesito un armario a medida para el dormitorio principal, con estantes y cajones."
  //   },
  //   {
  //     id: "isPending",
  //     title: "Instalación de estanterías",
  //     status: "pending",
  //     user: "Elena González",
  //     description: "Instalar 3 estanterías de madera en la pared del salón."
  //   },
  // ]

  // aceptedJobs = [
  //   {
  //     id: "inProgress",
  //     title: "Desatascar fregadero",
  //     status: "inProgress",
  //     user: "Miguel Fernández - Plomero",
  //     description: "El fregadero de la cocina está atascado, necesito que lo desatasquen."
  //   },
  //   {
  //     id: 12,
  //     title: "Reparación de horno",
  //     status: "completed",
  //     user: "David  Hernández",
  //     description: "El horno de la cocina no enciende, necesita reparación."
  //   }
  // ]

  role!: string | null;

  userId!: string | undefined;

  constructor(
    private router: Router,
    private offersService: OffersService
  ) {
    addIcons({ add });
  }

  ionViewWillEnter() {
    this.role = localStorage.getItem('role');
    this.userId = localStorage.getItem('userId') ?? undefined;
    if (this.role === 'employer') {
      this.offersService.getEmployerOffersHome(this.userId).subscribe({
        next: (res) => {
          console.log('Offers response:', res.offers);
          console.log('Accepted offers:', res.acceptedOffers);
        },
        error: (err) => {
          console.error('Error fetching offers:', err);
        }
      });
    } else if (this.role === 'worker') {
      
    }
  }

  createIndirectOffer() {
    this.router.navigate(['indirect-offer']);
  }

  goToSearch() {
    this.router.navigate(['search']);
  }

  goToOffer(item: any) {
    this.router.navigate(['offer', item.id]);
  }

}
