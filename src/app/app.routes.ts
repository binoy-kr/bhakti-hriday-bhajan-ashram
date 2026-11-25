import { Routes } from '@angular/router';
import { UserLayout } from './layout/user-layout/user-layout';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { AdminLayout } from './layout/admin-layout/admin-layout';

export const routes: Routes = [
  {
    path: '',
    component: UserLayout,
    children: [
      {
        path: '',
        title: 'Bhakti Hriday Bhajan Ashram',
        loadComponent: () => import('./pages/user-module/home/home').then((m) => m.Home)
      },
      {
        path: 'about',
        title: 'About · Bhakti Hriday Bhajan Ashram',
        loadComponent: () => import('./pages/user-module/about/about').then((m) => m.About)
      },
      {
        path: 'services',
        title: 'Spiritual Services · BHB',
        loadComponent: () => import('./pages/user-module/services/services').then((m) => m.Services)
      },
      {
        path: 'festivals',
        title: 'Festivals · BHB',
        loadComponent: () => import('./pages/user-module/festivals/festivals').then((m) => m.Festivals)
      },
      {
        path: 'gallery',
        title: 'Darshan Gallery · BHB',
        loadComponent: () => import('./pages/user-module/gallery/gallery').then((m) => m.Gallery)
      },
      {
        path: 'room-booking',
        title: 'Room Booking · BHB',
        loadComponent: () => import('./pages/user-module/room-booking/room-booking').then((m) => m.RoomBooking)
      },
      {
        path: 'donation',
        title: 'Donation · BHB',
        loadComponent: () => import('./pages/user-module/donation/donation').then((m) => m.Donation)
      },
      {
        path: 'contact',
        title: 'Contact · BHB',
        loadComponent: () => import('./pages/user-module/contact/contact').then((m) => m.Contact)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        title: 'Login · BHB',
        loadComponent: () => import('./pages/auth-module/login/login').then((m) => m.Login)
      },
      {
        path: 'register',
        title: 'Registration · BHB',
        loadComponent: () => import('./pages/auth-module/register/register').then((m) => m.Register)
      },
      {
        path: 'forgot-password',
        title: 'Reset Password · BHB',
        loadComponent: () => import('./pages/auth-module/forgot-password/forgot-password').then((m) => m.ForgotPassword)
      }
    ]
  },
  { path: 'login', redirectTo: 'auth/login' },
  { path: 'register', redirectTo: 'auth/register' },
  { path: 'forgot-password', redirectTo: 'auth/forgot-password' },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        title: 'Dashboard · BHB',
        loadComponent: () => import('./pages/admin-module/dashboard/dashboard').then((m) => m.Dashboard)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
