import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.page.html',
  styleUrls: ['./register-worker.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonItem, IonLabel]
})
export class RegisterWorkerPage implements OnInit {

  user: any = {
    businessName: '',
    description: ''
  };

  constructor(private router: Router, private usersService: UsersService) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['user']) {
      this.user = { ...nav.extras.state['user'], ...this.user };
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.usersService.registerUser(this.user).subscribe({
      next: () => this.router.navigate(['tabs', 'home']),
      error: (err) => { /* handle error */ }
    });
  }

}
