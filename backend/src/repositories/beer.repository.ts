import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Beer, BeerRelations} from '../models';

export class BeerRepository extends DefaultCrudRepository<
  Beer,
  typeof Beer.prototype.id,
  BeerRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Beer, dataSource);
  }
}
