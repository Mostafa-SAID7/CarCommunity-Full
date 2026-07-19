import { Component, Input, Output, EventEmitter, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
         (click)="cancelled.emit()">
      <div class="card w-full max-w-lg" (click)="$event.stopPropagation()">
        <div class="p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-5">
            {{ post ? 'Edit Post' : 'New Post' }}
          </h2>
          <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-4">
            <div>
              <label class="form-label">Title</label>
              <input formControlName="title" class="form-input" placeholder="Post title">
            </div>
            <div>
              <label class="form-label">Content</label>
              <textarea formControlName="content" rows="5" class="form-input resize-none"
                        placeholder="What's on your mind?"></textarea>
            </div>
            <div>
              <label class="form-label">Image URL (optional)</label>
              <input formControlName="imageUrl" class="form-input" placeholder="https://...">
            </div>
            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-primary flex-1" [disabled]="saving()">
                {{ saving() ? 'Saving…' : 'Post' }}
              </button>
              <button type="button" class="btn-secondary flex-1" (click)="cancelled.emit()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class PostFormComponent implements OnInit {
  @Input() post: Post | null = null;
  @Output() saved     = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  private fb      = inject(FormBuilder);
  private postSvc = inject(PostService);
  saving          = signal(false);

  form = this.fb.group({
    title:    ['', Validators.required],
    content:  ['', Validators.required],
    imageUrl: [''],
  });

  ngOnInit(): void { if (this.post) this.form.patchValue(this.post as any); }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const dto = this.form.value as any;
    if (this.post) {
      this.postSvc.update(this.post.id, dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    } else {
      this.postSvc.create(dto).subscribe({ next: () => this.saved.emit(), error: () => this.saving.set(false) });
    }
  }
}
