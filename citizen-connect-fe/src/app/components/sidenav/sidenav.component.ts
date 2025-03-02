import { Component, HostListener, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawerMode, MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { Location } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-sidenav',
  imports: [
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
export class SidenavComponent implements OnInit{
  sidenavWidth = 16;
  showFiller = false;
  sidenavOpen: boolean = false;
  sidenavMode: string = 'side';

  isAdmin: boolean = false;
  isParent: boolean = false;
  mode = new FormControl('side' as MatDrawerMode);

  constructor(
    public router: Router,
    private location: Location
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkWindowSize();
  }

  ngOnInit() {
    this.checkWindowSize();
    if (this.location.path().includes('admin')) this.isAdmin = true;
    if (this.location.path().includes('parent')) this.isParent = true
  }

  checkWindowSize(): void {
    if (window.innerWidth >= 992) {
      this.sidenavOpen = true;
      this.sidenavMode = 'side';
    } else {
      this.sidenavOpen = false;
      this.sidenavMode = 'over';
    }
  }
  onClick(): void{
    if (window.innerWidth <=992){
      this.sidenavOpen = !this.sidenavOpen;
    }else{
      this.sidenavOpen = true;
    }
  }

  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = 4;
  }
}
