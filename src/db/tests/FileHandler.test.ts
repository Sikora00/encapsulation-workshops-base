import FSHandler from "../FileHandler";
import * as path from "path";

describe("FileHandler", () => {
  const testPath = path.join(__dirname + "/test.json");
  let fileHandler: FSHandler;
  const content = "test";

  beforeEach(() => {
    fileHandler = new FSHandler(testPath);
  });

  it("should be able to create a new FileHandler", () => {
    expect(fileHandler).toBeInstanceOf(FSHandler);
    expect(fileHandler).toHaveProperty("path");
  });

  it("should be able to create a new file", async () => {
    await fileHandler.createFile();

    const isFileExists = await fileHandler.isFileExists();

    expect(isFileExists).toBe(true);
  });

  it("should be able to write a file", async () => {
    await fileHandler.writeFile(content);

    const data = await fileHandler.readFile();

    expect(data).toBe(content);
  });

  it("should be able to read a file", async () => {
    await fileHandler.writeFile(content);

    const data = await fileHandler.readFile();

    expect(data).toBe(content);
  });

  it("should be able to check if a file exists", async () => {
    await fileHandler.writeFile(content);

    const isFileExists = await fileHandler.isFileExists();
  });

  it("should delete a file", async () => {
    const isFileExists = await fileHandler.isFileExists();
    expect(isFileExists).toBe(false);
  });

  afterEach(async () => {
    if (await fileHandler.isFileExists()) {
      await fileHandler.deleteFile();
    }
  });
});
