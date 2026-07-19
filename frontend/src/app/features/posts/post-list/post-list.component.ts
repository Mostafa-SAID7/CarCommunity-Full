import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../core/services/post.service';
import { ToastService } from '../../../core/services/toast.service';
import { Post } from '../../../core/models/post.model';
import { PostCardComponent } from '../../../shared/components/post-card/post-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { PostFormComponent } from '../post-form/post-form.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent, SpinnerComponent, PostFormComponent],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Community</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ posts().length }} posts</p>
        </div>
        <button class="btn-primary" (click)="openForm()">+ New Post</button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (posts().length > 0) {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (post of posts(); track post.id) {
              <app-post-card [post]="post"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="text-center py-20 text-gray-400">
            <div class="text-5xl mb-4">💬</div>
            <p class="font-medium">No posts yet</p>
            <p class="text-sm mt-1">Share something with the community.</p>
          </div>
        }
      }

      @if (showForm()) {
        <app-post-form [post]="selectedPost()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `
})
export class PostListComponent implements OnInit {
  private postSvc = inject(PostService);
  private toast   = inject(ToastService);

  posts        = signal<Post[]>([]);
  loading      = signal(true);
  showForm     = signal(false);
  selectedPost = signal<Post | null>(null);

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading.set(true);
    this.postSvc.getAll().subscribe({
      next: data => { this.posts.set(data); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  openForm(post: Post | null = null): void {
    this.selectedPost.set(post);
    this.showForm.set(true);
  }

  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Post saved.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this post?')) return;
    this.postSvc.delete(id).subscribe({
      next: () => { this.posts.update(p => p.filter(x => x.id !== id)); this.toast.success('Post deleted.'); }
    });
  }
}
