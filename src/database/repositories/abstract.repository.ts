import { DataSource, EntityTarget, FindOneOptions, Repository } from 'typeorm';
import { ToEntity, ToModel } from '../../common/interfaces/model.interface';

export class AbstractRepository<
  Entity extends ToModel<any> & ToEntity<Entity>,
  Model,
> extends Repository<Entity> {
  constructor(target: EntityTarget<Entity>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  public async findOneModelOrFail(
    options?: FindOneOptions<Entity>,
  ): Promise<Model> {
    const entity = await super.findOneOrFail(options);

    return entity.toModel();
  }

  public async saveModel(model: Model): Promise<Model> {
    const entity = this.create().toEntity(model);

    const savedEntity = await super.save(entity);

    return savedEntity.toModel();
  }
}
