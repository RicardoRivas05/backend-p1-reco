import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Source, SourceRelations, Datos} from '../models';
import {DatosRepository} from './datos.repository';

export class SourceRepository extends DefaultCrudRepository<
  Source,
  typeof Source.prototype.id,
  SourceRelations
> {

  public readonly sourceDatos: HasManyRepositoryFactory<Datos, typeof Source.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DatosRepository') protected datosRepositoryGetter: Getter<DatosRepository>,
  ) {
    super(Source, dataSource);
    this.sourceDatos = this.createHasManyRepositoryFactoryFor('sourceDatos', datosRepositoryGetter,);
    this.registerInclusionResolver('sourceDatos', this.sourceDatos.inclusionResolver);
  }
}
