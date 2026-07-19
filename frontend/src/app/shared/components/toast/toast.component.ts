import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-full max-w-sm">
      @for (toast of toastSvc.toasts(); track toast.id) {
        <div (click)="toastSvc.dismiss(toast.id)"
             class="flex items-start gap-3 px-4 py-3.5 rounded-xl border
                    text-sm font-medium cursor-pointer animate-slide-up
                    backdrop-blur-sm shadow-modal transition-all duration-200"
             [ngClass]="{
               'bg-emerald-950/90 border-emerald-800/60 text-emerald-300': toast.type === 'success',
               'bg-crimson-950/90 border-crimson-800/60 text-crimson-300': toast.type === 'error',
               'bg-ash/90 border-iron text-ghost':                          toast.type === 'info'
             }">
          <!-- Icon -->
          <span class="flex-shrink-0 mt-0.5">
            @if (toast.type === 'success') {
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            }
            @if (toast.type === 'error') {
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
            }
            @if (toast.type === 'info') {
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            }
          </span>
          <span class="flex-1 leading-snug">{{ toast.message }}</span>
          <svg class="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-50" fill="none" stroke="currentColor"
               stroke-width="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  toastSvc = inject(ToastService);
}
