import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-hover group flex flex-col">
      @if (post.imageUrl) {
        <div class="relative h-44 bg-onyx overflow-hidden flex-shrink-0">
          <img [src]="post.imageUrl" [alt]="post.title"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-transparent"></div>
        </div>
      }

      <div class="flex flex-col flex-1 p-5 gap-3">
        <!-- Title -->
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg bg-crimson-900/40 border border-crimson-800/40
                      flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4 text-crimson-400" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          </div>
          <div class="min-w-0">
            <h3 class="font-bold text-ghost text-sm leading-snug line-clamp-2">{{ post.title }}</h3>
          </div>
        </div>

        <p class="text-xs text-fog leading-relaxed line-clamp-3 flex-1">{{ post.content }}</p>

        <div class="flex gap-2 pt-1">
          <button (click)="edit.emit(post)" class="btn-secondary text-xs h-8 px-3 flex-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </button>
          <button (click)="delete.emit(post.id)" class="btn-danger text-xs h-8 px-3 flex-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path stroke-linecap="round" stroke-linejoin="round"
              d="M19 6l-1 14H6L5 6m5 0V4h4v2"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  `,
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() edit   = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<string>();
}
