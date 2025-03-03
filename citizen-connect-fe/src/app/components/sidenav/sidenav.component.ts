import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterOutlet,
    MatToolbarModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  sidenavWidth = 6;
  showFiller = false;
  sidenavOpen: boolean = false;
  sidenavMode: MatDrawerMode = 'side';

  isAdmin: boolean = false;
  isOfficial: boolean = false;
  mode = new FormControl('side' as MatDrawerMode);

  constructor(
    public router: Router,
    private location: Location,
    private loginService: LoginService
  ) {
    this.router.events.subscribe(() => {
      if (window.innerWidth < 992) {
        this.sidenavOpen = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  ngOnInit() {
    this.checkWindowSize();
    this.checkUserRole();
  }

  checkWindowSize(): void {
    if (window.innerWidth >= 992) {
      this.sidenavOpen = true; // Open sidenav on large screens
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpen = false; // Close on small screens
      this.sidenavMode = 'over';
    }
  }
  checkUserRole(): void {
    const role = this.loginService.getUserRole(); // Get user role from token
    if (role === 'admin') this.isAdmin = true;
    if (role === 'govtOfficial') this.isOfficial = true;
    console.log('Role', role);
    console.log('isAdmin:', this.isAdmin);
    console.log('isOfficial:', this.isOfficial);

  }


  onClick(): void {
    this.sidenavOpen = !this.sidenavOpen; // Toggle sidenav
  }
  isPollsDropdownOpen = false;
  isDocsDropdownOpen = false;

  // Toggle the polls dropdown
  togglePollsDropdown(): void {
    this.isPollsDropdownOpen = !this.isPollsDropdownOpen;
  }
  toggleDocsDropdown(): void {
    this.isDocsDropdownOpen = !this.isDocsDropdownOpen;
  }
  closeSidenavOnSelect(): void {
    console.log("Reached");

    if (window.innerWidth < 992) {
      console.log("Read");

      this.sidenavOpen = false;
    }
  }

  logout() {
    console.log('Logging out...');
    this.loginService.logout();
    this.router.navigate(['/']).then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
      window.location.reload()
    });
  }


}
