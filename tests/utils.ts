import { getConnectionOptions, createConnection, Connection } from "typeorm";
import { SimpleEntity } from "../src/db/entities/simple";

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
    SimpleEntity
	];

	for (const entityClass of sequentialSchemaList) {
		await entityClass.delete({});
	}
}
