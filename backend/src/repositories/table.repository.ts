import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Table, TableRelations} from '../models';

export class TableRepository extends DefaultCrudRepository<
  Table,
  typeof Table.prototype.id,
  TableRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Table, dataSource);
  }
}
