import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, IonList, IonAvatar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add, star, chatbubble } from 'ionicons/icons';
import { CategoriesService } from 'src/services/categories/categories.service';
import { OffersService } from 'src/services/offers/offers.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonModal, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonDatetimeButton, IonIcon, IonButtons, IonButton, RouterModule, IonBackButton, IonInput, IonList, IonAvatar]
})
export class OfferPage implements OnInit {

  @ViewChild("imageModal") imgModal!: IonModal;
  @ViewChild("ratingModal") rtgModal!: IonModal;
  @ViewChild("dateModal") dateModal!: IonModal;

  isDetail: boolean = false;
  offer: any = {
    title: '',
    category: '',
    description: '',
    startTime: '',
    endTime: '',
    photos: [],
    workerId: '',
    employerId: '',
    chatId: null
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
    addIcons({ add, star, chatbubble });
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

        this.offersService.getOfferById(offerId).subscribe({
          next: (res) => {
            this.offer = res;
            if (this.offer.status == 'inProgress') {
              this.inProgress = true;
            }
            if (this.offer.status == 'pending') {
              this.isPending = true;
            }
          }
        });
      }
    });
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
    });
  }

  createOffer() {
    if (this.offer.workerId) {
      this.offersService.postCreateDirectOffer(this.offer).subscribe({
        next: (res) => {
          this.router.navigate(['tabs', 'home']);
        }
      });
    }
  }

  goToProfile() {
    this.router.navigate(['profile', this.role === 'employer' ? this.offer.workerId._id : this.offer.employerId._id]);
  }

  openChat() {
    if (this.offer.chatId) {
      this.router.navigate(['chat', this.offer.chatId], { state: { worker: this.offer.workerId, employer: this.offer.employerId } });
    }
    else {
      this.router.navigate(['chat'], { state: { worker: this.offer.workerId, employer: this.offer.employerId } });
    }
  }

  finishJob() {
    this.rtgModal.present();
  }

  finishWork() {
    const scoreData = {
      receiverId: this.role === 'employer' ? this.offer.workerId._id : this.offer.employerId._id,
      senderId: this.role === 'employer' ? this.offer.employerId._id : this.offer.workerId._id,
      rate: this.rating,
      comment: this.comment
    };
    this.offersService.putFinishOffer(this.offer._id, scoreData).subscribe({
      next: (res) => {
        console.log('Offer finished successfully:', res);
        this.offer.status = 'completed';
        this.rtgModal.dismiss();
      },
      error: (err) => {
        console.error('Error finishing offer:', err);
      }
    });
  }

  addImage() {
    if (this.offer.photos.length < 3) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
              const base64String = e.target.result as string;
              this.offer.photos.push(base64String);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
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

  selectedDate: string = '';

  getMinDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  acceptOffer() {
    this.dateModal.present();
  }

  confirmDate() {
    if (this.selectedDate) {
      console.log('Offer accepted with date:', this.selectedDate);
      this.offersService.putAcceptOffer(this.offer._id, this.selectedDate).subscribe({
        next: (res) => {
          console.log('Offer accepted successfully:', res);
          this.offer.status = 'inProgress';
          this.dateModal.dismiss();
        },
        error: (err) => {
          console.error('Error accepting offer:', err);
        }
      });
    }
  }

  dismissDateModal() {
    this.dateModal.dismiss();
    this.selectedDate = '';
  }

  rejectOffer() {
    console.log('Offer rejected');
    this.offersService.putRejectOffer(this.offer._id).subscribe({
        next: (res) => {
          console.log('Offer rejected successfully:', res);
          this.offer.status = 'rejected';
          this.dateModal.dismiss();
        },
        error: (err) => {
          console.error('Error rejecting offer:', err);
        }
      });
  }

}
