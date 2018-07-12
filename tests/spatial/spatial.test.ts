import { Connection } from "typeorm";
import { clearTypeORMDatabase, createConnectionForTests } from "../utils";
import { SpatialEntity } from "../../src/db/entities/spatial";

describe('Spatial tests', () => {
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

  describe('which circle contains the given point?', () => {
    const pois = [
      { 
        name: 'Budapest',
        coordinates: { 
          latitude: 47.497913,
          longitude: 19.040236,
          radius: 10000
        }
      },
      { 
        name: 'Óbuda',
        coordinates: { 
          latitude: 47.5406792,
          longitude: 19.0297593,
          radius: 1000
        }
      },
      { 
        name: 'London',
        coordinates: { 
          latitude: 51.5287718,
          longitude: -0.2416803,
          radius: 50000
        }
      }
    ];
    beforeEach(async () => {
      await Promise.all(
        pois.map(poi => {
          const entity = new SpatialEntity();
          entity.name = poi.name;
          entity.geom = `POINT(${poi.coordinates.latitude} ${poi.coordinates.longitude})`;
          entity.radius = poi.coordinates.radius;
          return entity.save();
        })
      );
    })
    it('should find the right circles for the points', async () => {
      const testCoordinates = [
        { 
          coordinates: {
            latitude: 47.457030,
            longitude: 19.069417,
            radius: 50
          },
          match: ['Budapest']
        },
        { 
          coordinates: {
            latitude: 47.539322,
            longitude: 19.038089,
            radius: 50
          },
          match: ['Budapest', 'Óbuda']
        },
        { 
          coordinates: {
            latitude: 51.531960,
            longitude: -0.154079,
            radius: 50
          },
          match: ['London']
        },
        { 
          coordinates: {
            latitude: 40.6971494,
            longitude: -74.2598655,
            radius: 50
          },
          match: []
        }
      ];

      for (const testData of testCoordinates) {
        const resultPOIs = await SpatialEntity.getContainingEntities(testData.coordinates);
        expect(resultPOIs.map(poi => poi.name).sort()).toEqual(testData.match.sort());
      }
    })
  });
})