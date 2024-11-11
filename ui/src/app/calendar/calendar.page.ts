import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
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
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FullCalendarModule]
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
    initialView: 'timeGridWeek',
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
        dayHeaderFormat: {
          weekday: 'narrow',
          day: 'numeric'
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
        url: '/tabs/tab1'
      },
      {
        id: 'b',
        title: 'sample',
        start: '2024-11-11',
        end: '2024-11-11',
        url: '/tabs/tab2'
      }
    ],
    height: 'auto'
  };

  constructor() {
    
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
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.changeView(view);
    }
  }

  ngOnInit() {

  }

}
