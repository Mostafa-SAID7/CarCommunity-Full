import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-ink flex items-center justify-center p-4 relative overflow-hidden">

      <!-- Cinematic background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-crimson-700/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-crimson-900/15 rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                    bg-crimson-800/5 rounded-full blur-3xl"></div>
        <!-- Grid overlay -->
        <div class="absolute inset-0 opacity-[0.03]"
             style="background-image: linear-gradient(rgba(248,248,248,.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(248,248,248,.1) 1px, transparent 1px);
                    background-size: 60px 60px;"></div>
      </div>

      <div class="w-full max-w-md relative z-10 animate-slide-up">
        <!-- Brand mark -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl
                      bg-red-gradient shadow-glow mb-5">
            <svg class="w-9 h-9 text-white" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
            </svg>
          </div>
          <h1 class="text-3xl font-black tracking-tight text-ghost">Auto<span class="text-crimson-500">Sphere</span></h1>
          <p class="text-sm text-fog mt-1.5 tracking-wide">Car Community Platform</p>
        </div>

        <router-outlet />
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {}
