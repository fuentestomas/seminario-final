import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem, IonInput, IonButton, IonCard, IonAvatar, IonLabel, IonCardContent, IonButtons, IonBackButton, IonTextarea } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { star, starOutline, camera } from 'ionicons/icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UsersService } from 'src/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonIcon,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonAvatar,
    IonLabel,
    IonCardContent,
    CommonModule,
    FormsModule,
    RouterModule,
    IonButtons,
    IonBackButton,
    IonTextarea
  ],
})
export class ProfilePage {

  isDetail: boolean = false;

  user = {
    _id: '',
    firstName: '',
    lastName: '',
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    role: '',
    avgScore: 0,
    profilePhoto: '',
    work: '',
    categories: [],
    description: '',
    businessName: '',
    openingHour: '',
    closingHour: ''
  }

  defaultAvatar: string = "../../assets/avatar.png";
  currentUserId: string = '';
  scores: any[] = [];
  isCurrentUser: boolean = false;
  
  comments = [
    {
      firstName: 'Tomas',
      lastName: 'Fuentes',
      text: 'Excelente servicio!'
    }
  ];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) {
    addIcons({ star, starOutline, camera })
  }

  ionViewWillEnter() {
    // Get current user from localStorage like in chat.page.ts
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.currentUserId = currentUser._id || '';

    this.route.paramMap.subscribe(params => {
      const userId = params.get('id');
      if (userId) {
        this.isDetail = true;
        this.isCurrentUser = userId === this.currentUserId;
        
        // Get user details
        this.usersService.getUserById(userId).subscribe({
          next: (res) => {
            this.user = { ...this.user, ...res };
          }
        });

        // Get user scores/comments if they are a worker
        this.usersService.getUserScores(userId).subscribe({
          next: (res) => {
            this.scores = res;
            // Note: avgScore is now managed on the backend
          }
        });
      } else if (this.currentUserId) {
        // Viewing/editing own profile
        this.isCurrentUser = true;
        this.usersService.getUserById(this.currentUserId).subscribe({
          next: (res) => {
            this.user = { ...this.user, ...res };
          }
        });
      }
    });
  }

  saveProfile() {
    if (this.isCurrentUser) {
      this.usersService.updateUser(this.user._id, this.user).subscribe({
        next: (res) => {
          console.log('Profile updated successfully');
          // Could add a toast/notification here
        },
        error: (err) => {
          console.error('Error updating profile:', err);
          // Could add error handling here
        }
      });
    }
  }

  selectProfilePicture() {
    if (!this.isCurrentUser) return;
    
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
            this.user.profilePhoto = base64String;
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  goToOffer() {
    this.router.navigate(['offer'], { state: { userId: this.user._id } });
  }

  logout() {
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
}
