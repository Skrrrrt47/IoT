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

export interface Command {}
