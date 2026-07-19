import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Car } from '../../../core/models/car.model';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card hover:shadow-md transition-shadow duration-200">
      <div class="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        @if (car.imageUrl) {
          <img [src]="car.imageUrl" [alt]="car.make + ' ' + car.model"
               class="w-full h-full object-cover">
        } @else {
          <div class="flex items-center justify-center h-full">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2 4h4l2 4v2h-2M13 6h2"/>
            </svg>
          </div>
        }
        <span class="absolute top-2 right-2 badge-primary">{{ car.year }}</span>
      </div>
      <div class="p-4">
        <h3 class="font-semibold text-gray-900">{{ car.make }} {{ car.model }}</h3>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ car.description || 'No description provided.' }}</p>
        <div class="flex gap-2 mt-3">
          <a [routerLink]="['/cars', car.id]" class="btn-primary text-xs flex-1 text-center">View</a>
          <button (click)="edit.emit(car)" class="btn-secondary text-xs flex-1">Edit</button>
          <button (click)="delete.emit(car.id)" class="btn-danger text-xs px-3">✕</button>
        </div>
      </div>
    </div>
  `
})
export class CarCardComponent {
  @Input() car!: Car;
  @Output() edit   = new EventEmitter<Car>();
  @Output() delete = new EventEmitter<string>();
}
