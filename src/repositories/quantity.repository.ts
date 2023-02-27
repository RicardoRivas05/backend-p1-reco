import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Quantity, QuantityRelations} from '../models';

export class QuantityRepository extends DefaultCrudRepository<
  Quantity,
  typeof Quantity.prototype.id,
  QuantityRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Quantity, dataSource);
  }
}
