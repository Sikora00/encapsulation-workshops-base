import { AnyObject } from '../types/utils.type';

export interface ToModel<Model> {
  toModel(): Model;
}

export interface ToEntity<Entity> {
  toEntity(snapshot: AnyObject): Entity;
}
