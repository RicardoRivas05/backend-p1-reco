import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Datos, DatosRelations, Source, Quantity} from '../models';
import {SourceRepository} from './source.repository';
import {QuantityRepository} from './quantity.repository';

export class DatosRepository extends DefaultCrudRepository<
  Datos,
  typeof Datos.prototype.id,
  DatosRelations
> {

  public readonly source: BelongsToAccessor<Source, typeof Datos.prototype.id>;

  public readonly quantity: BelongsToAccessor<Quantity, typeof Datos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('SourceRepository') protected sourceRepositoryGetter: Getter<SourceRepository>, @repository.getter('QuantityRepository') protected quantityRepositoryGetter: Getter<QuantityRepository>,
  ) {
    super(Datos, dataSource);
    this.quantity = this.createBelongsToAccessorFor('quantity', quantityRepositoryGetter,);
    this.registerInclusionResolver('quantity', this.quantity.inclusionResolver);
    this.source = this.createBelongsToAccessorFor('source', sourceRepositoryGetter,);
    this.registerInclusionResolver('source', this.source.inclusionResolver);
  }
}
