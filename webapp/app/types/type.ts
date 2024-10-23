export interface Beer {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Table {
  id: number;
  status: boolean;
  capacity: number;
}

export interface Command {
  id: number;
  nb_beers: number;
  beer_id: number;
  date: Date;
  table_id: number;
  price: number;
}
