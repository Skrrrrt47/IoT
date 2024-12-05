import {Entity, hasMany, model, property} from '@loopback/repository';
import {Command} from './command.model';

@model({settings: {strict: false}})
export class Table extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  status: boolean;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'date',
    required: true,
  })
  dateMaintenance: string;

  @hasMany(() => Command)
  commands: Command[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Table>) {
    super(data);
  }
}

export interface TableRelations {
  // describe navigational properties here
}

export type TableWithRelations = Table & TableRelations;
