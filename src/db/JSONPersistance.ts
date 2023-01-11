import Model from "./Model";
import IPersistance from "./IPersistance";

import fs from "fs";
import { IFileHandler } from "./FileHandler";

type ModelWithId = { id: string };

export default class JSONPersistance<T extends ModelWithId>
  implements IPersistance<T>
{
  constructor(private path: string, private fileHandler: IFileHandler) {
    this.createFileIfNotExists();
  }

  save(entity: T): Promise<[T]> {
    const json = await this.readFileToJson();

    json.push(entity);
    await this.fileHandler.writeFile(this.path, JSON.stringify(json));

    return json;
  }

  delete(entity: T): Promise<T> {
    const json = await this.readFileToJson();

    json.filter((item: T) => item !== entity);
    await this.fileHandler.writeFile(this.path, JSON.stringify(json));

    return entity;
  }

  findAll(): Promise<[T]> {
    const json = await this.readFileToJson();
    return json;
  }

  findById(id: string): Promise<T> {
    const json = await this.readFileToJson();
    const entity = json.find((item: T) => item.id === id);
    return entity;
  }

  update(id: string, entity: T): Promise<T> {
    const json = await this.readFileToJson();

    const index = json.findIndex((item: T) => item.id === id);

    json[index] = entity;

    await this.fileHandler.writeFile;
  }

  private createFile(data: string) {
    await fileHandler.writeFile(this.path);
  }

  private async createFileIfNotExists() {
    const checkIfFileExistsForThisSchema = this.fileHandler.isFileExists();

    if (!checkIfFileExistsForThisSchema) {
      this.fileHandler.createFile();
    }
  }

  private async readFileToJson() {
    const data = await this.fileHandler.readFile(this.path);
    const json = JSON.parse(data);
    return json;
  }
}
