import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Quantity, QuantityRelations, Datos} from '../models';
import {DatosRepository} from './datos.repository';

export class QuantityRepository extends DefaultCrudRepository<
  Quantity,
  typeof Quantity.prototype.id,
  QuantityRelations
> {

  public readonly quantityDatos: HasManyRepositoryFactory<Datos, typeof Quantity.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DatosRepository') protected datosRepositoryGetter: Getter<DatosRepository>,
  ) {
    super(Quantity, dataSource);
    this.quantityDatos = this.createHasManyRepositoryFactoryFor('quantityDatos', datosRepositoryGetter,);
    this.registerInclusionResolver('quantityDatos', this.quantityDatos.inclusionResolver);
  }
}
