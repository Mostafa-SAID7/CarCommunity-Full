import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card-hover group flex flex-col">
      <!-- Image -->
      <div class="relative h-48 bg-onyx overflow-hidden flex-shrink-0">
        @if (car.imageUrl) {
          <img [src]="car.imageUrl" [alt]="car.make + ' ' + car.model"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent"></div>
        } @else {
          <div class="flex items-center justify-center h-full">
            <svg class="w-16 h-16 text-iron" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.5 5H20l1 4v1h-2"/>
            </svg>
          </div>
        }
        <!-- Year badge -->
        <span class="absolute top-3 right-3 badge-red">{{ car.year }}</span>
        <!-- Hover overlay -->
        <div class="absolute inset-0 bg-crimson-900/0 group-hover:bg-crimson-900/10
                    transition-colors duration-300"></div>
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 class="font-bold text-ghost text-base leading-tight">{{ car.make }} {{ car.model }}</h3>
          <p class="text-xs text-fog mt-1.5 leading-relaxed line-clamp-2">
            {{ car.description || 'No description provided.' }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 mt-auto pt-1">
          <a [routerLink]="['/cars', car.id]" class="btn-primary text-xs flex-1 h-8 px-3">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            View
          </a>
          <button (click)="edit.emit(car)" class="btn-secondary text-xs flex-1 h-8 px-3">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </button>
          <button (click)="delete.emit(car.id)" class="btn-danger h-8 w-8 p-0 flex-shrink-0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path stroke-linecap="round" stroke-linejoin="round"
              d="M19 6l-1 14H6L5 6m5 0V4h4v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class CarCardComponent {
  @Input() car!: Car;
  @Output() edit   = new EventEmitter<Car>();
  @Output() delete = new EventEmitter<string>();
}
