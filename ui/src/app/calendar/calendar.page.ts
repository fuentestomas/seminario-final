import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esGlobalLocale from '@fullcalendar/core/locales/es';
import { cA } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, IonFooter, IonHeader, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol, CommonModule, FullCalendarModule]
})
export class CalendarPage implements OnInit {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    locale: esGlobalLocale,
    slotLabelFormat: {hour: 'numeric', minute: '2-digit', hour12: false},
    firstDay: 0,
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    /*
      timeGridDay para dia
      timeGridWeek para semana
      dayGridMonth para mes
      list para lista
    */
    initialView: 'list',
    weekends: true,
    headerToolbar: {
      start: 'title',
      //center: '',
      end: 'today,prev,next'
    },
    views: {
      dayGrid: {
        dayHeaderFormat: {
          weekday: 'short'
        }
      },
      week: {
        titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
        dayHeaderFormat: {
          weekday: 'narrow',
          day: '2-digit'
        }
      },
      day: {
        dayHeaderFormat: {
          weekday: 'long'
        }
      }
    },
    events: [
      {
        id: 'a',
        title: 'my event',
        start: '2024-11-11T10:30:00',
        end: '2024-11-11T11:30:00',
        allDay: false,
        url: '/tabs/chat'
      },
      {
        id: 'b',
        title: 'sample',
        start: '2024-11-11',
        end: '2024-11-11',
        url: '/tabs/home'
      }
    ],
    height: 'auto'
  };

  constructor() {
    
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      setTimeout(() => {
        calendarApi.updateSize();
      }, 0);
    }
  }

  changeView(view: string) {
    const calendarApi = this.calendarComponent.getApi();
    if (this.calendarComponent) {
      calendarApi.changeView(view);
    }
  }

}
