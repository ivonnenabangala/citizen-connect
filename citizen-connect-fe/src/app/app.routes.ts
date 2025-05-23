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
    {
        path: 'chat/:id',
        loadComponent: () => import('./components/chat/chat.component').then(c => c.ChatComponent)
    },
    {
        path: 'admin/dashboard',
        loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent)
    },
    {
        path: 'admin/polls',
        loadComponent: () => import('./admin/admin-polls/admin-polls.component').then(c => c.AdminPollsComponent)
    },
    {
        path: 'admin/documents',
        loadComponent: () => import('./admin/admin-documents/admin-documents.component').then(c => c.AdminDocumentsComponent)
    },
    {
        path: 'admin/discussions',
        loadComponent: () => import('./admin/admin-discussions/admin-discussions.component').then(c => c.AdminDiscussionsComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./admin/users/users.component').then(c => c.UsersComponent)
    },

];
