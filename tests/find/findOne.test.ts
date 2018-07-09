import { Connection } from "typeorm";
import { clearTypeORMDatabase, createConnectionForTests } from "../utils";
import { SimpleEntity } from "../../src/db/entities/simple";

describe('.findOne()', () => {
  let connection: Connection
  beforeAll(async () => {
    connection = await createConnectionForTests()
    await clearTypeORMDatabase();
  });
  afterEach(async () => {
    await clearTypeORMDatabase();
  });
  afterAll(async () => {
    await connection.close();
  });

  describe('Partial<Entity> lookup', () => {
    it('should find one entity', async () => {
      const simpleEntity = new SimpleEntity();
  
      const savedSimpleEntity = await simpleEntity.save();
      expect(savedSimpleEntity).toBeTruthy();
      expect(typeof savedSimpleEntity.id).toEqual('number');
  
      const foundSimpleEntity = await SimpleEntity.findOne({ id: savedSimpleEntity.id });
      expect(foundSimpleEntity).toBeTruthy();
      expect(foundSimpleEntity).toEqual(savedSimpleEntity);
    });
  
    it('should return undefined in an empty table', async () => {
      const foundSimpleEntity = await SimpleEntity.findOne({ id: 1 });
      expect(foundSimpleEntity).toBeFalsy();
    });
  
    it('should return undefined if no row matches the condition', async () => {
      const simpleEntity = new SimpleEntity();
  
      const savedSimpleEntity = await simpleEntity.save();
      expect(savedSimpleEntity).toBeTruthy();
      expect(typeof savedSimpleEntity.id).toEqual('number');
  
      const foundSimpleEntity = await SimpleEntity.findOne({ id: savedSimpleEntity.id + 1 });
      expect(foundSimpleEntity).toBeFalsy();
    });
  });

  describe('direct id number lookup', () => {
    it('should find one entity', async () => {
      const simpleEntity = new SimpleEntity();
  
      const savedSimpleEntity = await simpleEntity.save();
      expect(savedSimpleEntity).toBeTruthy();
      expect(typeof savedSimpleEntity.id).toEqual('number');
  
      const foundSimpleEntity = await SimpleEntity.findOne(savedSimpleEntity.id);
      expect(foundSimpleEntity).toBeTruthy();
      expect(foundSimpleEntity).toEqual(savedSimpleEntity);
    });
  
    it('should return undefined in an empty table', async () => {
      const foundSimpleEntity = await SimpleEntity.findOne(1);
      expect(foundSimpleEntity).toBeFalsy();
    });
  
    it('should return undefined if no row matches the condition', async () => {
      const simpleEntity = new SimpleEntity();
  
      const savedSimpleEntity = await simpleEntity.save();
      expect(savedSimpleEntity).toBeTruthy();
      expect(typeof savedSimpleEntity.id).toEqual('number');
  
      const foundSimpleEntity = await SimpleEntity.findOne(savedSimpleEntity.id + 1);
      expect(foundSimpleEntity).toBeFalsy();
    });
  });
});