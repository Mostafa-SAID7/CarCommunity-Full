import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarEvent } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-5 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <h3 class="font-semibold text-gray-900 truncate">{{ event.name }}</h3>
          <p class="text-sm text-gray-500 mt-1 line-clamp-2">{{ event.description }}</p>
          <div class="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
            <span class="flex items-center gap-1">
              📅 {{ event.eventDate | date:'mediumDate' }}
            </span>
            <span class="flex items-center gap-1">
              📍 {{ event.location }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button (click)="edit.emit(event)" class="btn-secondary text-xs">Edit</button>
        <button (click)="delete.emit(event.id)" class="btn-danger text-xs">Delete</button>
      </div>
    </div>
  `
})
export class EventCardComponent {
  @Input() event!: CarEvent;
  @Output() edit   = new EventEmitter<CarEvent>();
  @Output() delete = new EventEmitter<string>();
}
