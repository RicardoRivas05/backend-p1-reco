import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Datos, DatosRelations} from '../models';

export class DatosRepository extends DefaultCrudRepository<
  Datos,
  typeof Datos.prototype.id,
  DatosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Datos, dataSource);
  }
}
