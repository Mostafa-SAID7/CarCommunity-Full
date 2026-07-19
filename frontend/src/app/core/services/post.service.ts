import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, CreatePostDto, UpdatePostDto } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private url = `${environment.apiUrl}/posts`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]>                   { return this.http.get<Post[]>(this.url); }
  getById(id: string): Observable<Post>          { return this.http.get<Post>(`${this.url}/${id}`); }
  create(dto: CreatePostDto): Observable<Post>   { return this.http.post<Post>(this.url, dto); }
  update(id: string, dto: UpdatePostDto): Observable<void> { return this.http.put<void>(`${this.url}/${id}`, dto); }
  delete(id: string): Observable<void>           { return this.http.delete<void>(`${this.url}/${id}`); }
}
