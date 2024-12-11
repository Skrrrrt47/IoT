import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';

import {TableRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {BeerRepository} from '../repositories';
import {Beer} from '../models';
import {Table} from '../models';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('AddDataGroup')
export class AddDataObserver implements LifeCycleObserver {
  constructor(
    @repository('TableRepository') private salesRepo: TableRepository,
    @repository('BeerRepository') private beerRepo: BeerRepository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    let tables: Table[] = [
      new Table({
        status: true,
        capacity: 10,
        dateMaintenance: new Date().toISOString(),
      }),
      new Table({
        status: true,
        capacity: 20,
        dateMaintenance: new Date().toISOString(),
      }),
    ];

    let beers: Beer[] = [
      new Beer({
        name: 'Pilsner',
        description: 'A light, crisp and bitter beer with a dry finish.',
        type: 'Pilsner',
        price: 5,
        urlImg:
          'https://upload.wikimedia.org/wikipedia/commons/d/da/Pilsner_urquell_mug.jpg',
      }),
      new Beer({
        name: 'IPA',
        description: 'A fruity and hoppy beer with a higher alcohol content',
        type: 'IPA',
        price: 6,
        urlImg:
          'https://upload.wikimedia.org/wikipedia/commons/3/32/Fuller%27s_India_pale_ale.jpg',
      }),
    ];
    this.salesRepo.createAll(tables);
    this.beerRepo.createAll(beers);
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
    this.salesRepo.deleteAll();
    this.beerRepo.deleteAll();
  }
}
