import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

interface NavItem { label: string; route: string; icon: string; }

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-gray-50 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-64 flex-shrink-0 bg-dark-900 text-white flex flex-col"
             [class.hidden]="!sidebarOpen()">
        <!-- Logo -->
        <div class="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8z"/>
            </svg>
          </div>
          <span class="font-bold text-lg tracking-wide">AutoSphere</span>
        </div>

        <!-- Nav -->
        <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route" routerLinkActive="bg-primary-600 text-white"
               [routerLinkActiveOptions]="{ exact: false }"
               class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-150">
              <span class="text-lg w-5 text-center">{{ item.icon }}</span>
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- User -->
        <div class="px-4 py-4 border-t border-white/10">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center
                        text-white text-sm font-bold flex-shrink-0">
              {{ initials() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ auth.currentUser()?.fullName }}</p>
              <p class="text-xs text-gray-400 truncate">{{ auth.currentUser()?.email }}</p>
            </div>
            <button (click)="auth.logout()" title="Logout"
                    class="text-gray-400 hover:text-red-400 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7
                         a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Topbar -->
        <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 flex-shrink-0">
          <button (click)="toggleSidebar()"
                  class="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div class="flex-1"></div>
          <span class="text-sm text-gray-500">Welcome, <strong>{{ auth.currentUser()?.fullName }}</strong></span>
        </header>

        <!-- Page content -->
        <main class="flex-1 overflow-y-auto p-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {
  auth        = inject(AuthService);
  sidebarOpen = signal(true);

  navItems: NavItem[] = [
    { label: 'Cars',      route: '/cars',      icon: '🚗' },
    { label: 'Events',    route: '/events',    icon: '📅' },
    { label: 'Community', route: '/posts',     icon: '💬' },
    { label: 'Customers', route: '/customers', icon: '👥' },
  ];

  toggleSidebar(): void { this.sidebarOpen.update(v => !v); }

  initials(): string {
    const name = this.auth.currentUser()?.fullName ?? '';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
}
