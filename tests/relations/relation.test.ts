import { Connection } from "typeorm";
import { clearTypeORMDatabase, createConnectionForTests } from "../utils";
import { RelationA } from "../../src/db/entities/relationA";
import { RelationC } from "../../src/db/entities/relationC";
import { RelationD } from "../../src/db/entities/relationD";
import { RelationE } from "../../src/db/entities/relationE";

describe("Relation between two entitites", () => {
  let connection: Connection;
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

  describe("@Column() relationId", () => {
    it("should fill out the id field after .save() if connected to a relation", async () => {
      const a = new RelationA();
      a.name = "relation.test.ts > a";
      await a.save();
  
      const c = new RelationC();
      c.name = "relation.test.ts > c1";
      c.relationA = a;
      await c.save();
  
      expect(c.relationAId).toBe(a.id);
      expect(c.relationA).toBe(a);
    });
  
    it("should not fill out the relation field after .save() if connected to an id", async () => {
      const a = new RelationA();
      a.name = "relation.test.ts > a";
      await a.save();
  
      const c = new RelationC();
      c.name = "relation.test.ts > c2";
      c.relationAId = a.id;
      await c.save();
  
      expect(c.relationAId).toBe(a.id);
      expect(c.relationA).toBeUndefined();
    });

    it("should fill out the id field after loading from disk", async () => {
      const a = new RelationA();
      a.name = "relation.test.ts > a";
      await a.save();
  
      const c = new RelationC();
      c.name = "relation.test.ts > c1";
      c.relationA = a;
      await c.save();

      const loaded = await RelationC.findOne({ id: c.id });
      if (!loaded) {
        throw new Error();
      }
      expect(loaded.relationAId).toBe(a.id);
      expect(loaded.relationA).toBeUndefined(); // lazy
    });
  });
  
  describe("@RelationId relationId", () => {
    it("should fill out the id field if connected to a relation", async () => {
      const a = new RelationA();
      a.name = "relation.test.ts > a";
      await a.save();
  
      const d = new RelationD();
      d.name = "relation.test.ts > d";
      d.relationA = a;
      await d.save();
  
      expect(d.relationAId).toBe(a.id);
      expect(d.relationA).toBe(a);
    });
  });

  describe("@RelationId() relationIds", () => {
    it("should fill out the id field after .save() if connected to a relation", async () => {
      const c1 = new RelationC();
      c1.name = "relation.test.ts > c1";
      await c1.save();

      const e = new RelationE();
      e.name = "relation.test.ts > e";
      e.relationCs = [c1];
      await e.save();

      expect(e.relationCs).toEqual([c1]);
      expect(e.relationCIds).toEqual([c1.id]);
    });

    it("should fill out the id field after loading from disk", async () => {
      const c1 = new RelationC();
      c1.name = "relation.test.ts > c1";
      await c1.save();

      const e = new RelationE();
      e.name = "relation.test.ts > e";
      e.relationCs = [c1];
      await e.save();

      const loaded = await RelationE.findOne({ id: e.id });
      if (!loaded) {
        throw new Error();
      }
      expect(loaded.relationCIds).toEqual([c1.id]);
      expect(loaded.relationCs).toBeUndefined(); // lazy
    });
  });
});