import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Command, CommandRelations} from '../models';

export class CommandRepository extends DefaultCrudRepository<
  Command,
  typeof Command.prototype.id,
  CommandRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Command, dataSource);
  }
}
