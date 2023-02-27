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
  Source,
  Datos,
} from '../models';
import {SourceRepository} from '../repositories';

export class SourceDatosController {
  constructor(
    @repository(SourceRepository) protected sourceRepository: SourceRepository,
  ) { }

  @get('/sources/{id}/datos', {
    responses: {
      '200': {
        description: 'Array of Source has many Datos',
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
    return this.sourceRepository.sourceDatos(id).find(filter);
  }

  @post('/sources/{id}/datos', {
    responses: {
      '200': {
        description: 'Source model instance',
        content: {'application/json': {schema: getModelSchemaRef(Datos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Source.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {
            title: 'NewDatosInSource',
            exclude: ['id'],
            optional: ['sourceId']
          }),
        },
      },
    }) datos: Omit<Datos, 'id'>,
  ): Promise<Datos> {
    return this.sourceRepository.sourceDatos(id).create(datos);
  }

  @patch('/sources/{id}/datos', {
    responses: {
      '200': {
        description: 'Source.Datos PATCH success count',
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
    return this.sourceRepository.sourceDatos(id).patch(datos, where);
  }

  @del('/sources/{id}/datos', {
    responses: {
      '200': {
        description: 'Source.Datos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Datos)) where?: Where<Datos>,
  ): Promise<Count> {
    return this.sourceRepository.sourceDatos(id).delete(where);
  }
}
