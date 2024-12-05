import {Entity, hasMany, model, property} from '@loopback/repository';
import {Command} from './command.model';

@model({settings: {strict: false}})
export class Beer extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  urlImg: string;

  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @hasMany(() => Command)
  commands: Command[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Beer>) {
    super(data);
  }
}

export interface BeerRelations {
  // describe navigational properties here
}

export type BeerWithRelations = Beer & BeerRelations;
