export interface BookStockStat{
  bookID: number;
  title: string;
  author: string;
  nrPages: number;
  rating: number;
  genre: string;
  quantity: number;

}


export interface StoreStockStat{
  storeID: number;
  storeName: string;
  address: string;
  contactNumber: string;
  openingHour: number;
  closingHour: number;
  quantity: number;

}
