import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard', component: SidenavComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

];
