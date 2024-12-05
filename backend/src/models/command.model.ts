import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Beer, BeerWithRelations} from './beer.model';
import {Table, TableWithRelations} from './table.model';

@model({settings: {strict: false}})
export class Command extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  nbBeers: number;

  @belongsTo(() => Beer)
  beerId: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @belongsTo(() => Table)
  tableId: number;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Command>) {
    super(data);
  }
}

export interface CommandRelations {
  // describe navigational properties here
  table?: TableWithRelations;
  beer?: BeerWithRelations;
}

export type CommandWithRelations = Command & CommandRelations;
