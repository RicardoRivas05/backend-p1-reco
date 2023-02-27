import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Quantity,
  Datos,
} from '../models';
import {QuantityRepository} from '../repositories';

export class QuantityDatosController {
  constructor(
    @repository(QuantityRepository) protected quantityRepository: QuantityRepository,
  ) { }

  @get('/quantities/{id}/datos', {
    responses: {
      '200': {
        description: 'Array of Quantity has many Datos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Datos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Datos>,
  ): Promise<Datos[]> {
    return this.quantityRepository.quantityDatos(id).find(filter);
  }

  @post('/quantities/{id}/datos', {
    responses: {
      '200': {
        description: 'Quantity model instance',
        content: {'application/json': {schema: getModelSchemaRef(Datos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Quantity.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {
            title: 'NewDatosInQuantity',
            exclude: ['id'],
            optional: ['quantityId']
          }),
        },
      },
    }) datos: Omit<Datos, 'id'>,
  ): Promise<Datos> {
    return this.quantityRepository.quantityDatos(id).create(datos);
  }

  @patch('/quantities/{id}/datos', {
    responses: {
      '200': {
        description: 'Quantity.Datos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {partial: true}),
        },
      },
    })
    datos: Partial<Datos>,
    @param.query.object('where', getWhereSchemaFor(Datos)) where?: Where<Datos>,
  ): Promise<Count> {
    return this.quantityRepository.quantityDatos(id).patch(datos, where);
  }

  @del('/quantities/{id}/datos', {
    responses: {
      '200': {
        description: 'Quantity.Datos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Datos)) where?: Where<Datos>,
  ): Promise<Count> {
    return this.quantityRepository.quantityDatos(id).delete(where);
  }
}
