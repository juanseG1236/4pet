import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProSer, ProSerRelations} from '../models';

export class ProSerRepository extends DefaultCrudRepository<
  ProSer,
  typeof ProSer.prototype.id,
  ProSerRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ProSer, dataSource);
  }
}
