import { getConnectionOptions, createConnection, Connection } from "typeorm";
import { SimpleEntity } from "../src/db/entities/simple";
import { SpatialEntity } from "../src/db/entities/spatial";

export async function createConnectionForTests(): Promise<Connection> {
	// Change the options because:
	// - tests run on top of .ts and not .js files
	// - disable logging
	const options = await getConnectionOptions();
	return createConnection({
		...options,
		entities: ['src/db/entities/*.ts'],
		logging: false,
	});
}

export async function clearTypeORMDatabase() {
	const sequentialSchemaList = [
		SimpleEntity,
		SpatialEntity
	];

	for (const entityClass of sequentialSchemaList) {
		await entityClass.delete({});
	}
}
