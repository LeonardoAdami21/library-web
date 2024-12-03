export interface IAuthor {
  id: number;
  name: string;
  birthDate: string;
  books?: Book[];
}

export interface Book {
  id: number;
  title: string;
  publicationDate: string;
  authorId?: number;
}
