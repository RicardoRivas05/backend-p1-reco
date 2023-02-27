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
import {Quantity} from '../models';
import {QuantityRepository} from '../repositories';

export class QuantityController {
  constructor(
    @repository(QuantityRepository)
    public quantityRepository : QuantityRepository,
  ) {}

  @post('/quantities')
  @response(200, {
    description: 'Quantity model instance',
    content: {'application/json': {schema: getModelSchemaRef(Quantity)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quantity, {
            title: 'NewQuantity',
            exclude: ['id'],
          }),
        },
      },
    })
    quantity: Omit<Quantity, 'id'>,
  ): Promise<Quantity> {
    return this.quantityRepository.create(quantity);
  }

  @get('/quantities/count')
  @response(200, {
    description: 'Quantity model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Quantity) where?: Where<Quantity>,
  ): Promise<Count> {
    return this.quantityRepository.count(where);
  }

  @get('/quantities')
  @response(200, {
    description: 'Array of Quantity model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Quantity, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Quantity) filter?: Filter<Quantity>,
  ): Promise<Quantity[]> {
    return this.quantityRepository.find(filter);
  }

  @patch('/quantities')
  @response(200, {
    description: 'Quantity PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quantity, {partial: true}),
        },
      },
    })
    quantity: Quantity,
    @param.where(Quantity) where?: Where<Quantity>,
  ): Promise<Count> {
    return this.quantityRepository.updateAll(quantity, where);
  }

  @get('/quantities/{id}')
  @response(200, {
    description: 'Quantity model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Quantity, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Quantity, {exclude: 'where'}) filter?: FilterExcludingWhere<Quantity>
  ): Promise<Quantity> {
    return this.quantityRepository.findById(id, filter);
  }

  @patch('/quantities/{id}')
  @response(204, {
    description: 'Quantity PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quantity, {partial: true}),
        },
      },
    })
    quantity: Quantity,
  ): Promise<void> {
    await this.quantityRepository.updateById(id, quantity);
  }

  @put('/quantities/{id}')
  @response(204, {
    description: 'Quantity PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() quantity: Quantity,
  ): Promise<void> {
    await this.quantityRepository.replaceById(id, quantity);
  }

  @del('/quantities/{id}')
  @response(204, {
    description: 'Quantity DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.quantityRepository.deleteById(id);
  }
}
