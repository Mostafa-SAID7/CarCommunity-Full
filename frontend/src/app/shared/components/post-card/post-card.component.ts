import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-5 hover:shadow-md transition-shadow duration-200">
      @if (post.imageUrl) {
        <img [src]="post.imageUrl" [alt]="post.title"
             class="w-full h-40 object-cover rounded-lg mb-4">
      }
      <h3 class="font-semibold text-gray-900">{{ post.title }}</h3>
      <p class="text-sm text-gray-500 mt-2 line-clamp-3">{{ post.content }}</p>
      <div class="flex gap-2 mt-4">
        <button (click)="edit.emit(post)" class="btn-secondary text-xs">Edit</button>
        <button (click)="delete.emit(post.id)" class="btn-danger text-xs">Delete</button>
      </div>
    </div>
  `
})
export class PostCardComponent {
  @Input() post!: Post;
  @Output() edit   = new EventEmitter<Post>();
  @Output() delete = new EventEmitter<string>();
}
