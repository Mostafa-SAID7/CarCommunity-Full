export interface CarEvent {
  id: string;
  name: string;
  description: string;
  eventDate: string;
  location: string;
}

export interface CreateEventDto {
  name: string;
  description: string;
  eventDate: string;
  location: string;
}

export interface UpdateEventDto {
  name: string;
  description: string;
  eventDate: string;
  location: string;
}
