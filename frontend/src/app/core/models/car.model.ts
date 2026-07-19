export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  description: string;
  imageUrl: string;
  userId: string;
}

export interface CreateCarDto {
  make: string;
  model: string;
  year: number;
  description: string;
  imageUrl: string;
}

export interface UpdateCarDto {
  make: string;
  model: string;
  year: number;
  description: string;
  imageUrl: string;
}
