export interface Book{
  id: number;
  title: string;
  author: string;
  nrPages: number;
  rating: number;
  genre: string;
  inStores: number;
}

export interface AddBookDTO{
  title: string;
  author: string;
  nrPages: number;
  rating: number;
  genre: string;
}


export interface BookDetailsDTO{
  title: string;
  author: string;
  nrPages: number;
  rating: number;
  genre: string;
  stores: string[];
}


export interface BookTable{
  content: Book[];
  number:number;
  size:number;
  totalElements:number;
  totalPages:number;

}
