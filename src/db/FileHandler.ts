const fs = require("fs").promises;

export interface IFileHandler {
  isFileExists(): Promise<boolean>;
  createFile(): Promise<void>;
  readFile(): Promise<string>;
  writeFile(content: string): Promise<void>;
  deleteFile(): Promise<void>;
}

export default class FSHandler implements IFileHandler {
  constructor(private path: string) {}

  async isFileExists(): Promise<boolean> {
    try {
      await fs.access(this.path, fs.constants.F_OK);

      return true;
    } catch (err) {
      return false;
    }
  }

  async createFile(): Promise<void> {
    await this.writeFile("");
  }

  async readFile(): Promise<string> {
    return await fs.readFile(this.path, "utf8");
  }

  async writeFile(content: string): Promise<void> {
    await fs.writeFile(this.path, content);
  }

  async deleteFile(): Promise<void> {
    await fs.unlink(this.path);
  }
}
