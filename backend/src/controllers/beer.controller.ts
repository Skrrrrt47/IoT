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
import {Beer} from '../models';
import {BeerRepository} from '../repositories';

export class BeerController {
  constructor(
    @repository(BeerRepository)
    public beerRepository : BeerRepository,
  ) {}

  @post('/beers')
  @response(200, {
    description: 'Beer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Beer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beer, {
            title: 'NewBeer',
            exclude: ['id'],
          }),
        },
      },
    })
    beer: Omit<Beer, 'id'>,
  ): Promise<Beer> {
    return this.beerRepository.create(beer);
  }

  @get('/beers/count')
  @response(200, {
    description: 'Beer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Beer) where?: Where<Beer>,
  ): Promise<Count> {
    return this.beerRepository.count(where);
  }

  @get('/beers')
  @response(200, {
    description: 'Array of Beer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Beer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Beer) filter?: Filter<Beer>,
  ): Promise<Beer[]> {
    return this.beerRepository.find(filter);
  }

  @patch('/beers')
  @response(200, {
    description: 'Beer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beer, {partial: true}),
        },
      },
    })
    beer: Beer,
    @param.where(Beer) where?: Where<Beer>,
  ): Promise<Count> {
    return this.beerRepository.updateAll(beer, where);
  }

  @get('/beers/{id}')
  @response(200, {
    description: 'Beer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Beer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Beer, {exclude: 'where'}) filter?: FilterExcludingWhere<Beer>
  ): Promise<Beer> {
    return this.beerRepository.findById(id, filter);
  }

  @patch('/beers/{id}')
  @response(204, {
    description: 'Beer PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beer, {partial: true}),
        },
      },
    })
    beer: Beer,
  ): Promise<void> {
    await this.beerRepository.updateById(id, beer);
  }

  @put('/beers/{id}')
  @response(204, {
    description: 'Beer PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() beer: Beer,
  ): Promise<void> {
    await this.beerRepository.replaceById(id, beer);
  }

  @del('/beers/{id}')
  @response(204, {
    description: 'Beer DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.beerRepository.deleteById(id);
  }
}
