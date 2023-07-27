import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isVisible: boolean = false;

  public appPages = [
    { title: 'Mis Datos', url: '/user/data', icon: 'person' },
    { title: 'Mis Citas', url: '/user/appointments', icon: 'calendar' },
    { title: 'Mis Exámenes', url: '/user/exams', icon: 'flask' },
    { title: 'Mis Reportes', url: '/user/reports', icon: 'document-text' },
    { title: 'Mis Interconsultas', url: '/user/interconsults', icon: 'medkit' },
  ];

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVisible = !['/login', '/'].includes(this.router.url);
      }
    });
  }
}
