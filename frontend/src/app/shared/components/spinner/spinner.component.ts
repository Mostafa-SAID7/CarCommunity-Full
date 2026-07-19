import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-20 gap-4">
      <div class="relative w-12 h-12">
        <div class="absolute inset-0 rounded-full border-2 border-iron"></div>
        <div class="absolute inset-0 rounded-full border-2 border-t-crimson-500 border-r-transparent
                    border-b-transparent border-l-transparent animate-spin"></div>
        <div class="absolute inset-2 rounded-full border border-crimson-800/40"></div>
      </div>
      <span class="text-xs text-fog tracking-widest uppercase font-semibold animate-pulse">Loading</span>
    </div>
  `,
})
export class SpinnerComponent {}
