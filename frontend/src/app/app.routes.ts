import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  // Redirect root
  { path: '', redirectTo: 'cars', pathMatch: 'full' },

  // Auth layout (guests only)
  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    canActivate: [guestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then(m => m.RegisterComponent),
      },
    ],
  },

  // Main layout (authenticated)
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      // Cars
      {
        path: 'cars',
        loadComponent: () =>
          import('./features/cars/car-list/car-list.component').then(m => m.CarListComponent),
      },
      {
        path: 'cars/:id',
        loadComponent: () =>
          import('./features/cars/car-detail/car-detail.component').then(m => m.CarDetailComponent),
      },
      // Events
      {
        path: 'events',
        loadComponent: () =>
          import('./features/events/event-list/event-list.component').then(m => m.EventListComponent),
      },
      // Posts / Community
      {
        path: 'posts',
        loadComponent: () =>
          import('./features/posts/post-list/post-list.component').then(m => m.PostListComponent),
      },
      // Customers
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent),
      },
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'cars' },
];
