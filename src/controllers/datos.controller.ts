import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Datos} from '../models';
import {DatosRepository} from '../repositories';

export class DatosController {
  constructor(
    @repository(DatosRepository)
    public datosRepository : DatosRepository,
  ) {}

  @post('/datos')
  @response(200, {
    description: 'Datos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Datos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {
            title: 'NewDatos',
            exclude: ['id'],
          }),
        },
      },
    })
    datos: Omit<Datos, 'id'>,
  ): Promise<Datos> {
    return this.datosRepository.create(datos);
  }

  @get('/datos/count')
  @response(200, {
    description: 'Datos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Datos) where?: Where<Datos>,
  ): Promise<Count> {
    return this.datosRepository.count(where);
  }

  @get('/datos')
  @response(200, {
    description: 'Array of Datos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Datos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Datos) filter?: Filter<Datos>,
  ): Promise<Datos[]> {
    return this.datosRepository.find(filter);
  }

  @patch('/datos')
  @response(200, {
    description: 'Datos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {partial: true}),
        },
      },
    })
    datos: Datos,
    @param.where(Datos) where?: Where<Datos>,
  ): Promise<Count> {
    return this.datosRepository.updateAll(datos, where);
  }

  @get('/datos/{id}')
  @response(200, {
    description: 'Datos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Datos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Datos, {exclude: 'where'}) filter?: FilterExcludingWhere<Datos>
  ): Promise<Datos> {
    return this.datosRepository.findById(id, filter);
  }

  @patch('/datos/{id}')
  @response(204, {
    description: 'Datos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Datos, {partial: true}),
        },
      },
    })
    datos: Datos,
  ): Promise<void> {
    await this.datosRepository.updateById(id, datos);
  }

  @put('/datos/{id}')
  @response(204, {
    description: 'Datos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() datos: Datos,
  ): Promise<void> {
    await this.datosRepository.replaceById(id, datos);
  }

  @del('/datos/{id}')
  @response(204, {
    description: 'Datos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.datosRepository.deleteById(id);
  }
}
