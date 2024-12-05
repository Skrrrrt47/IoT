import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Table} from '../models';
import {TableRepository} from '../repositories';

export class TableController {
  constructor(
    @repository(TableRepository)
    public tableRepository: TableRepository,
  ) {}

  @post('/tables')
  @response(200, {
    description: 'Table model instance',
    content: {'application/json': {schema: getModelSchemaRef(Table)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {
            title: 'NewTable',
            exclude: ['id'],
          }),
        },
      },
    })
    table: Omit<Table, 'id'>,
  ): Promise<Table> {
    return this.tableRepository.create(table);
  }

  @get('/tables/count')
  @response(200, {
    description: 'Table model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Table) where?: Where<Table>): Promise<Count> {
    return this.tableRepository.count(where);
  }

  @get('/tables')
  @response(200, {
    description: 'Array of Table model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Table, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Table) filter?: Filter<Table>): Promise<Table[]> {
    return this.tableRepository.find(filter);
  }

  @patch('/tables')
  @response(200, {
    description: 'Table PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {partial: true}),
        },
      },
    })
    table: Table,
    @param.where(Table) where?: Where<Table>,
  ): Promise<Count> {
    console.log('table', table);
    return this.tableRepository.updateAll(table, where);
  }

  @get('/tables/{id}')
  @response(200, {
    description: 'Table model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Table, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Table, {exclude: 'where'})
    filter?: FilterExcludingWhere<Table>,
  ): Promise<Table> {
    return this.tableRepository.findById(id, filter);
  }

  @patch('/tables/{id}')
  @response(204, {
    description: 'Table PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Table, {partial: true}),
        },
      },
    })
    table: Table,
  ): Promise<void> {
    await this.tableRepository.updateById(id, table);
  }

  @put('/tables/{id}')
  @response(204, {
    description: 'Table PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() table: Table,
  ): Promise<void> {
    await this.tableRepository.replaceById(id, table);
  }

  @del('/tables/{id}')
  @response(204, {
    description: 'Table DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tableRepository.deleteById(id);
  }
}
