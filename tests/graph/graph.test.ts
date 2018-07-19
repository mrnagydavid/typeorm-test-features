import { Connection } from "typeorm";
import { clearTypeORMDatabase, createConnectionForTests } from "../utils";
import { Node } from "../../src/db/entities/graph";
import { RelationA } from "../../src/db/entities/relationA";
import { RelationB } from "../../src/db/entities/relationB";

describe('eager loading', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnectionForTests()
    await clearTypeORMDatabase();
  });
  afterEach(async () => {
    // await clearTypeORMDatabase();
  });
  afterAll(async () => {
    await connection.close();
  });

  describe("Graph Node", () => {
    it("should not load every related entity", () => {
      interface Point {
        name: string;
        children?: Point[]
      }
  
      const hierarchy = {
        root: {
          name: 'Root',
          children: [
            {
              name: 'Level 1 (#1)',
              children: [
                {
                  name: 'Level 2'
                }
              ]
            },
            {
              name: 'Level 1 (#2)'
            }
          ]
        }
      };
      async function saveGraph(node: Point, parent?: Node): Promise<Node> {
        const me = new Node();
        me.name = node.name;      
        if (parent) {
          me.parent = parent;
        }
        await me.save();
        if (node.children && node.children.length > 0) {
          await Promise.all(node.children.map(child => saveGraph(child, me)));
        }
        return me;
      }
  
      return saveGraph(hierarchy.root)
      .then((rootNode) => {
        return Node.findOne({ id: rootNode.id });
        // return Node.createQueryBuilder('graph').where({ id: rootNode.id }).getOne();
      })
      .then((retrievedRootNode) => {
        if (!retrievedRootNode) {
          throw Error();
        }
        console.log(JSON.stringify(retrievedRootNode));
        expect(retrievedRootNode.name).toEqual(hierarchy.root.name);
        expect(retrievedRootNode.children).toBeFalsy();
      });
    });
  });

  describe("simple relations", () => {
    it("should only load eagerly where { eager: true } is set", async () => {
      const a = new RelationA();
      const b = new RelationB();
      a.name = "Rel A";
      await a.save();

      b.name = "Rel B";
      b.relationA = a;
      await b.save();

      return RelationA.findOne({ id: a.id })
      .then((retrievedA) => {
        console.log(retrievedA);
        if (!retrievedA) {
          throw Error();
        }
        expect(retrievedA).toBeTruthy();
        expect(retrievedA.relationBs).toBeTruthy();
        return RelationB.findOne({ id: b.id });
      })
      .then((retrievedB) => {
        console.log(retrievedB);
        if (!retrievedB) {
          throw Error();
        }
        expect(retrievedB).toBeTruthy();
        expect(retrievedB.relationA).not.toBeTruthy();
      });
    });
  });
});