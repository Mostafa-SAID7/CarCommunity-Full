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
    <div class="animate-fade-in">
      <div class="page-header">
        <div>
          <h1 class="page-title">
            <span class="text-ghost">Community</span>
            <span class="text-crimson-500 ml-2">Feed</span>
          </h1>
          <p class="page-subtitle">{{ loading() ? '—' : posts().length }} posts shared</p>
        </div>
        <button class="btn-primary" (click)="openForm()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Post
        </button>
      </div>

      @if (loading()) { <app-spinner /> }

      @if (!loading()) {
        @if (posts().length > 0) {
          <div class="grid-cards-3">
            @for (post of posts(); track post.id) {
              <app-post-card [post]="post"
                (edit)="openForm($event)"
                (delete)="onDelete($event)" />
            }
          </div>
        } @else {
          <div class="empty-state">
            <div class="w-20 h-20 rounded-2xl bg-crimson-900/20 border border-crimson-800/30
                        flex items-center justify-center mb-5">
              <svg class="w-10 h-10 text-crimson-700" fill="none" stroke="currentColor" stroke-width="1.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <p class="empty-title">No posts yet</p>
            <p class="empty-body">Be the first to share something with the community.</p>
            <button class="btn-primary mt-5" (click)="openForm()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Write First Post
            </button>
          </div>
        }
      }

      @if (showForm()) {
        <app-post-form [post]="selectedPost()"
          (saved)="onSaved()"
          (cancelled)="showForm.set(false)" />
      }
    </div>
  `,
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
      next:  data => { this.posts.set(data); this.loading.set(false); },
      error: ()   => this.loading.set(false),
    });
  }

  openForm(post: Post | null = null): void { this.selectedPost.set(post); this.showForm.set(true); }
  onSaved(): void { this.showForm.set(false); this.load(); this.toast.success('Post published.'); }

  onDelete(id: string): void {
    if (!confirm('Delete this post?')) return;
    this.postSvc.delete(id).subscribe({
      next: () => { this.posts.update(p => p.filter(x => x.id !== id)); this.toast.success('Post deleted.'); },
    });
  }
}
