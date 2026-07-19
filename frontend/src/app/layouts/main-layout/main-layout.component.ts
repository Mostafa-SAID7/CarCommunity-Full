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
    <div class="flex h-screen bg-ink overflow-hidden">

      <!-- Sidebar -->
      <aside class="flex-shrink-0 flex flex-col bg-void border-r border-iron transition-all duration-300 z-20"
             [class]="sidebarOpen() ? 'w-64' : 'w-0 overflow-hidden border-r-0'">

        <!-- Logo -->
        <div class="flex items-center gap-3 px-5 py-5 border-b border-iron flex-shrink-0">
          <div class="w-9 h-9 rounded-xl bg-red-gradient shadow-glow-sm flex items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
            </svg>
          </div>
          <div>
            <span class="font-black tracking-tight text-ghost text-lg leading-none">
              Auto<span class="text-crimson-500">Sphere</span>
            </span>
            <p class="text-[10px] text-fog tracking-widest uppercase mt-0.5">Community</p>
          </div>
        </div>

        <!-- Nav -->
        <nav class="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          <p class="text-[10px] font-bold tracking-widest uppercase text-fog/60 px-3 mb-3">Navigation</p>
          @for (item of navItems; track item.route) {
            <a [routerLink]="item.route" routerLinkActive
               #rla="routerLinkActive"
               [class]="'nav-item ' + (rla.isActive ? 'nav-item-active' : '')">
              <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center" [innerHTML]="item.icon"></span>
              <span class="truncate">{{ item.label }}</span>
              @if (rla.isActive) {
                <span class="ml-auto w-1.5 h-1.5 rounded-full bg-crimson-500"></span>
              }
            </a>
          }
        </nav>

        <!-- User -->
        <div class="px-3 py-4 border-t border-iron flex-shrink-0">
          <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-ash/40">
            <div class="w-8 h-8 rounded-xl bg-red-gradient shadow-glow-sm flex items-center justify-center
                        text-white text-xs font-black flex-shrink-0">
              {{ initials() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-ghost truncate leading-tight">{{ auth.currentUser()?.fullName }}</p>
              <p class="text-xs text-fog truncate">{{ auth.currentUser()?.email }}</p>
            </div>
            <button (click)="auth.logout()" class="btn-icon flex-shrink-0" title="Sign out">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1 flex flex-col overflow-hidden min-w-0">

        <!-- Topbar -->
        <header class="bg-void/90 backdrop-blur border-b border-iron px-4 py-3 flex items-center gap-4 flex-shrink-0">
          <button (click)="toggleSidebar()" class="btn-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Breadcrumb line -->
          <div class="h-4 w-px bg-iron"></div>
          <span class="text-xs text-fog tracking-widest uppercase font-semibold">AutoSphere</span>

          <div class="flex-1"></div>

          <!-- User pill -->
          <div class="hidden sm:flex items-center gap-2 text-sm text-mist">
            <div class="w-6 h-6 rounded-lg bg-red-gradient flex items-center justify-center
                        text-white text-[10px] font-black">
              {{ initials() }}
            </div>
            <span class="font-medium text-ghost">{{ auth.currentUser()?.fullName }}</span>
          </div>
        </header>

        <!-- Content -->
        <main class="flex-1 overflow-y-auto">
          <div class="p-6 max-w-screen-2xl mx-auto">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
})
export class MainLayoutComponent {
  auth        = inject(AuthService);
  sidebarOpen = signal(true);

  navItems: NavItem[] = [
    {
      label: 'Cars',
      route: '/cars',
      icon: `<svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
             </svg>`,
    },
    {
      label: 'Events',
      route: '/events',
      icon: `<svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
               <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
               <line x1="3" y1="10" x2="21" y2="10"/>
             </svg>`,
    },
    {
      label: 'Community',
      route: '/posts',
      icon: `<svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
             </svg>`,
    },
    {
      label: 'Customers',
      route: '/customers',
      icon: `<svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round"
                     d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
               <circle cx="9" cy="7" r="4"/>
               <path stroke-linecap="round" stroke-linejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
             </svg>`,
    },
  ];

  toggleSidebar(): void { this.sidebarOpen.update(v => !v); }

  initials(): string {
    const name = this.auth.currentUser()?.fullName ?? '';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }
}
