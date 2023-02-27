import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Source, SourceRelations} from '../models';

export class SourceRepository extends DefaultCrudRepository<
  Source,
  typeof Source.prototype.id,
  SourceRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Source, dataSource);
  }
}
