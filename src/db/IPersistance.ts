export default interface IPersistance<T> {
  save(entity: T): Promise<[T]>;
  delete(entity: T): Promise<[T]>;
  update(id: string, entity: T): Promise<[T]>;
  findAll(): Promise<[T]>;
  findById(id: string): Promise<T>;
}
