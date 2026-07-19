import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      @for (toast of toastSvc.toasts(); track toast.id) {
        <div
          class="flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white
                 transition-all duration-300 cursor-pointer"
          [class]="toastClass(toast.type)"
          (click)="toastSvc.dismiss(toast.id)">
          <span>{{ icon(toast.type) }}</span>
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  toastSvc = inject(ToastService);

  toastClass(type: string): string {
    return { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' }[type] ?? 'bg-gray-700';
  }
  icon(type: string): string {
    return { success: '✓', error: '✕', info: 'ℹ' }[type] ?? '•';
  }
}
