import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonModal, IonButtons, IonButton]
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  email: string = '';
  password: string = '';
  name: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  async onSubmit() {
    console.log('Iniciar sesión con:', this.email, this.password);
  }

  login(value: string) {
    console.log(value);
    this.modal.dismiss();
    this.router.navigate(['']);
  }

  goToRegister() {
    console.log('Navegar a la página de registro');
  }

  forgotPassword() {
    console.log('Navegar a la página de recuperación de contraseña');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.email = `Hello, ${ev.detail.data}!`;
    }
  }
}
