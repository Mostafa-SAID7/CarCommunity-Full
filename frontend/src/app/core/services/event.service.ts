import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CarEvent, CreateEventDto, UpdateEventDto } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private url = `${environment.apiUrl}/events`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<CarEvent[]>                   { return this.http.get<CarEvent[]>(this.url); }
  getById(id: string): Observable<CarEvent>          { return this.http.get<CarEvent>(`${this.url}/${id}`); }
  create(dto: CreateEventDto): Observable<CarEvent>  { return this.http.post<CarEvent>(this.url, dto); }
  update(id: string, dto: UpdateEventDto): Observable<void> { return this.http.put<void>(`${this.url}/${id}`, dto); }
  delete(id: string): Observable<void>               { return this.http.delete<void>(`${this.url}/${id}`); }
}
