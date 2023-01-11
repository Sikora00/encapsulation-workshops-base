export default class Model<T> {
  constructor(private name: string) {}

  save(entity: T) {}

  findByIdAndUpdate(id: string, entity: T) {}

  findByIdAndDelete(id: string) {}

  findById(id: string) {}

  findAll() {}
}
