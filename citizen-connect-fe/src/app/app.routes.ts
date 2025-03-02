import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PollsComponent } from './components/polls/polls.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', component: SidenavComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'polls',
        loadComponent: () => import('./components/polls/polls.component').then(c => c.PollsComponent)
    },
    {
        path: 'discussions',
        loadComponent: () => import('./components/discussions/discussions.component').then(c => c.DiscussionsComponent)
    },
    {
        path: 'incidents',
        loadComponent: () => import('./components/incidents/incidents.component').then(c => c.IncidentsComponent)
    },
    {
        path: 'documents',
        loadComponent: () => import('./components/documents/documents.component').then(c => c.DocumentsComponent)
    },

];
