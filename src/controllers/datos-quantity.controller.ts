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
  Quantity,
} from '../models';
import {DatosRepository} from '../repositories';

export class DatosQuantityController {
  constructor(
    @repository(DatosRepository)
    public datosRepository: DatosRepository,
  ) { }

  @get('/datos/{id}/quantity', {
    responses: {
      '200': {
        description: 'Quantity belonging to Datos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Quantity)},
          },
        },
      },
    },
  })
  async getQuantity(
    @param.path.string('id') id: typeof Datos.prototype.id,
  ): Promise<Quantity> {
    return this.datosRepository.quantity(id);
  }
}
