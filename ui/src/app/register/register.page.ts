import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

declare var google: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonModal, IonButton, IonItem, IonIcon, IonLabel, IonInput, IonBackButton, IonButtons]
})
export class RegisterPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  role!: string;

  user = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    profilePicture: null as File | null
  };

  profileImageUrl: SafeUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private ngZone: NgZone)
    {
      addIcons({ camera })
    }

  ngOnInit() {
    //this.loadGoogleMapsScript();
  }

  onSubmit() {

  }

  ionViewWillEnter() {
    this.modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
  }

  selectRole(role: string) {
    console.log(role);
    this.role = role;
    localStorage.setItem('role', role);
    this.dismissModal();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.email = `Hello, ${ev.detail.data}!`;
    }
  }

  selectProfilePicture() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        this.user.profilePicture! = file;
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  loadGoogleMapsScript() {
    if (!document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initAutocomplete();
      document.head.appendChild(script);
    } else {
      this.initAutocomplete();
    }
  }

  initAutocomplete() {
    const addressInput = document.querySelector('ion-input[name="address"] input') as HTMLInputElement;
    if (addressInput) {
      const autocomplete = new google.maps.places.Autocomplete(addressInput, {
        types: ['address'],
        componentRestrictions: { country: 'AR' } // Restrict to Spain, change as needed
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          this.user.address = place.formatted_address;
        });
      });
    }
  }

}
