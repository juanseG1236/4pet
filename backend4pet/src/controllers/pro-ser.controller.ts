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
import {ProSer} from '../models';
import {ProSerRepository} from '../repositories';

export class ProSerController {
  constructor(
    @repository(ProSerRepository)
    public proSerRepository : ProSerRepository,
  ) {}

  @post('/pro-sers')
  @response(200, {
    description: 'ProSer model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProSer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProSer, {
            title: 'NewProSer',
            exclude: ['id'],
          }),
        },
      },
    })
    proSer: Omit<ProSer, 'id'>,
  ): Promise<ProSer> {
    return this.proSerRepository.create(proSer);
  }

  @get('/pro-sers/count')
  @response(200, {
    description: 'ProSer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProSer) where?: Where<ProSer>,
  ): Promise<Count> {
    return this.proSerRepository.count(where);
  }

  @get('/pro-sers')
  @response(200, {
    description: 'Array of ProSer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProSer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProSer) filter?: Filter<ProSer>,
  ): Promise<ProSer[]> {
    return this.proSerRepository.find(filter);
  }

  @patch('/pro-sers')
  @response(200, {
    description: 'ProSer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProSer, {partial: true}),
        },
      },
    })
    proSer: ProSer,
    @param.where(ProSer) where?: Where<ProSer>,
  ): Promise<Count> {
    return this.proSerRepository.updateAll(proSer, where);
  }

  @get('/pro-sers/{id}')
  @response(200, {
    description: 'ProSer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProSer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ProSer, {exclude: 'where'}) filter?: FilterExcludingWhere<ProSer>
  ): Promise<ProSer> {
    return this.proSerRepository.findById(id, filter);
  }

  @patch('/pro-sers/{id}')
  @response(204, {
    description: 'ProSer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProSer, {partial: true}),
        },
      },
    })
    proSer: ProSer,
  ): Promise<void> {
    await this.proSerRepository.updateById(id, proSer);
  }

  @put('/pro-sers/{id}')
  @response(204, {
    description: 'ProSer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proSer: ProSer,
  ): Promise<void> {
    await this.proSerRepository.replaceById(id, proSer);
  }

  @del('/pro-sers/{id}')
  @response(204, {
    description: 'ProSer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proSerRepository.deleteById(id);
  }
}
