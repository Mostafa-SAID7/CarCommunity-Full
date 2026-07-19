export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
}

export interface CreatePostDto {
  title: string;
  content: string;
  imageUrl: string;
}

export interface UpdatePostDto {
  title: string;
  content: string;
  imageUrl: string;
}
