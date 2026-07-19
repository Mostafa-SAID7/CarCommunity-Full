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
    <div class="modal-overlay" (click)="cancelled.emit()">
      <div class="modal" (click)="$event.stopPropagation()">

        <div class="modal-header">
          <div>
            <h2 class="text-base font-black text-ghost">{{ post ? 'Edit Post' : 'New Post' }}</h2>
            <p class="text-xs text-fog mt-0.5">{{ post ? 'Update your post' : 'Share something with the community' }}</p>
          </div>
          <button (click)="cancelled.emit()" class="btn-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="modal-body space-y-4">
          <div class="field">
            <label class="label">Title</label>
            <input formControlName="title" class="input"
                   [class.input-error]="form.get('title')?.invalid && form.get('title')?.touched"
                   placeholder="What's the headline?">
            @if (form.get('title')?.invalid && form.get('title')?.touched) {
              <span class="field-error">Title is required.</span>
            }
          </div>

          <div class="field">
            <label class="label">Content</label>
            <textarea formControlName="content" rows="5" class="input"
                      [class.input-error]="form.get('content')?.invalid && form.get('content')?.touched"
                      placeholder="Tell the community your story…"></textarea>
            @if (form.get('content')?.invalid && form.get('content')?.touched) {
              <span class="field-error">Content is required.</span>
            }
          </div>

          <div class="field">
            <label class="label">Image URL <span class="normal-case font-normal text-fog">(optional)</span></label>
            <input formControlName="imageUrl" class="input" placeholder="https://…">
          </div>

          <div class="modal-footer px-0 pb-0 pt-2">
            <button type="submit" class="btn-primary flex-1 h-11" [disabled]="saving()">
              @if (saving()) {
                <div class="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Posting…
              } @else {
                {{ post ? 'Update Post' : 'Publish Post' }}
              }
            </button>
            <button type="button" class="btn-secondary flex-1 h-11" (click)="cancelled.emit()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
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
