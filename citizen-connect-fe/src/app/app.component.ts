import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, Event } from '@angular/router';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'citizen-connect-fe';
  showSidenav = false;
  ngOnInit() {
    // Check initial route
    this.updateSidenavVisibility(this.router.url);
    
    // Subscribe to future navigation events
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateSidenavVisibility(event.urlAfterRedirects);
    });
  }

  constructor(private router: Router) {
    
  }
  private updateSidenavVisibility(url: string) {
    const excludedRoutes = ['/login', '/register', '/'];
    this.showSidenav = !excludedRoutes.some(route => url === route);
  }
}
