import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HomeComponent } from "./components/home/home.component";
import { RouterOutlet, Router } from '@angular/router';
import { SidenavComponent } from "./components/sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidenavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'citizen-connect-fe';
  showSidenav = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const excludedRoutes = ['/login', '/register', '/'];
      this.showSidenav = !excludedRoutes.includes(this.router.url);
    });
  }
}
