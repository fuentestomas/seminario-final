import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add, star } from 'ionicons/icons';
import { CategoriesService } from 'src/services/categories/categories.service';
import { OffersService } from 'src/services/offers/offers.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonModal, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonDatetimeButton, IonIcon, IonButtons, IonButton, RouterModule, IonBackButton, IonInput]
})
export class OfferPage implements OnInit {

  @ViewChild("imageModal") imgModal!: IonModal;
  @ViewChild("ratingModal") rtgModal!: IonModal;

  isDetail: boolean = false;
  offer: any = {
    title: '',
    category: '',
    description: '',
    startTime: '',
    endTime: '',
    photos: [],
    workerId: '',
  };
  image!: string;

  inProgress: boolean = false;
  isPending: boolean = false;
  rating: number = 0;
  comment: string = '';

  role!: string | null;

  categories: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private offersService: OffersService
  ) {
    addIcons({ add, star });
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['userId']) {
      this.offer.workerId = nav.extras.state['userId'];
      console.log('Worker ID:', this.offer.workerId);
    }
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.route.paramMap.subscribe(params => {
      const offerId = params.get('id');
      if (offerId) {
        this.isDetail = true;

        this.offer = {
          title: 'Instalacion electrica',
          serviceType: 'type1',
          description: 'Necesito instalar 3 tomacorrientes',
          startTime: '10:00',
          endTime: '18:00',
          images: [
            '../../assets/logo.png',
            '../../assets/avatar.png'
          ]
        };
        if (offerId == 'inProgress') {
          this.inProgress = true;
        }
        if (offerId == 'isPending') {
          this.isPending = true;
        }
      }
    });
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
    });
  }

  onSubmit() {
    if (this.offer.workerId) {
      this.offersService.postCreateDirectOffer(this.offer).subscribe({
        next: (res) => {
          this.router.navigate(['tabs', 'home']);
        }
      });
    }
  }

  finishJob() {
    this.rtgModal.present();
  }

  addImage() {
    if (this.offer.images.length < 3) {
      // In a real app, this would trigger the device's camera or file picker
      this.offer.images.push('../../assets/logo.png');
    }
  }

  openFullscreen(image: string) {
    this.image = image;
    this.imgModal.present();
  }

  dismissModal() {
    this.imgModal.dismiss();
  }

  setRating(value: number) {
    this.rating = value;
  }

  cancel() {
    console.log('Rating:', this.rating);
    console.log('Comment:', this.comment);
    this.rating = 0;
    this.comment = '';
    this.rtgModal.dismiss();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.email = `Hello, ${ev.detail.data}!`;
    }
  }

  acceptOffer() {
    console.log('Offer accepted');
    // Implement your accept logic here
  }

  rejectOffer() {
    console.log('Offer rejected');
    // Implement your reject logic here
  }

}
