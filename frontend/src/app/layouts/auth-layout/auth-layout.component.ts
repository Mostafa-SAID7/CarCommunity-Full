import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900
                flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Brand -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16
                      bg-primary-600 rounded-2xl shadow-lg mb-4">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white">AutoSphere</h1>
          <p class="text-gray-400 text-sm mt-1">Car Community Platform</p>
        </div>
        <router-outlet />
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
