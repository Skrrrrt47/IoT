import {Client, expect} from '@loopback/testlab';
import sinon from 'sinon';
import {BackendApplication} from '../..';
import {BeerRepository} from '../../repositories';
import {setupApplication} from './test-helper';

describe('BeerController', () => {
  let repository: BeerRepository;
  beforeEach(givenStubbedRepository);

  // your unit tests

  let app: BackendApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /beers', async () => {
    const res = await client.get('/beers').expect(200);
    expect(res.body).to.containEql([]);
  });

  function givenStubbedRepository() {
    repository = sinon.createStubInstance(BeerRepository);
  }
});
