export interface Beer {
  id: number;
  name: string;
  description: string;
  price: number;
  urlImg: string;
}

export interface Table {
  id: number;
  status: boolean;
  capacity: number;
}

export interface Command {
  id: number;
  nbBeers: number;
  beerId: number;
  date: Date;
  tableId: number;
  price: number;
}
