import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Datos,
  Source,
} from '../models';
import {DatosRepository} from '../repositories';

export class DatosSourceController {
  constructor(
    @repository(DatosRepository)
    public datosRepository: DatosRepository,
  ) { }

  @get('/datos/{id}/source', {
    responses: {
      '200': {
        description: 'Source belonging to Datos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Source)},
          },
        },
      },
    },
  })
  async getSource(
    @param.path.string('id') id: typeof Datos.prototype.id,
  ): Promise<Source> {
    return this.datosRepository.source(id);
  }
}
