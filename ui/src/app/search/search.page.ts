import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonAvatar, IonItem, IonButtons, IonBackButton, IonIcon, IonModal, IonSelect, IonSelectOption, IonRange, IonInput, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { options } from 'ionicons/icons';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { fromEvent, Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { SearchService } from 'src/services/search/search.service';
import { CategoriesService } from 'src/services/categories/categories.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonLabel, IonAvatar, IonItem, CommonModule, FormsModule, IonButtons, IonBackButton, IonIcon, IonModal, IonSelect, IonSelectOption, IonRange, IonInput, IonButton, IonGrid, IonRow, IonCol]
})
export class SearchPage implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('searchBar') searchBar: any;

  items: any[] = [];

  // items = [
  //   {
  //     "id": 1,
  //     "name": "Javier Valicenti",
  //     "description": "Electricista con más de 10 años de experiencia en instalaciones residenciales y comerciales. Javier es conocido por su meticulosidad y atención al detalle, asegurando que cada trabajo se realice con precisión y seguridad. Siempre dispuesto a resolver cualquier problema eléctrico, desde la instalación de un nuevo tomacorriente hasta la reparación de un sistema complejo."
  //   },
  //   {
  //     "id": 2,
  //     "name": "Omar Juarez",
  //     "description": "Plomero experto en la resolución de problemas de plomería, desde fugas de agua hasta la instalación de sistemas de calefacción. Omar se destaca por su rapidez y eficiencia, ofreciendo soluciones duraderas y garantizando la satisfacción del cliente. Siempre disponible para emergencias, con un servicio amable y profesional."
  //   },
  //   {
  //     "id": 3,
  //     "name": "Agustin Romero",
  //     "description": "Carpintero con una pasión por la madera y un talento innato para crear piezas únicas y funcionales. Agustín combina la artesanía tradicional con técnicas modernas para ofrecer muebles a medida, restauraciones y trabajos de carpintería en general. Su creatividad y atención al detalle se reflejan en cada proyecto que realiza."
  //   }
  // ];

  private searchSub?: Subscription;

  categoryFilter: string = '';
  proximityFilter: number = 50;
  categories: any[] = [];

  constructor(
    private router: Router,
    private searchService: SearchService,
    private categoriesService: CategoriesService
  ) {
    addIcons({ options });
  }

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }
    });
  }

  ngAfterViewInit() {
    this.searchBar.getInputElement()
      .then((nativeInput: HTMLInputElement) => {
        this.searchSub = fromEvent<InputEvent>(nativeInput, 'input').pipe(
          map((e: Event) => (e.target as HTMLInputElement).value),
          debounceTime(1000)
        ).subscribe((value: string) => this.searchWorkers(value));
      })
  }

  searchWorkers(searchText: string | null | undefined) {
    // console.log(searchText)
    this.searchService.getSearchWorkers(searchText || '', this.categoryFilter, this.proximityFilter).subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error fetching search results:', error);
      }
    });
  }

  ngOnDestroy() {
    this.searchSub?.unsubscribe();
  }

  openFiltersModal() {
    this.modal.present();
  }

  dismissModal() {
    this.modal.dismiss();
    this.searchWorkers(this.searchBar.value);
  }

  goToProfile(item: any) {
    this.router.navigate(['profile', item._id]);
  }

  resetFilters() {
    // Implement reset logic here
    console.log('Filters reset');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      //this.email = `Hello, ${ev.detail.data}!`;
    }
  }

}
