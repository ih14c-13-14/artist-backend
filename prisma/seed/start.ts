import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { insertPrefectures } from './prefectures';
import { insertAuthors } from './authors';
import { insertArts } from './arts';
import { insertInstitutions } from './institutions';
import { insertArtInstitution } from './artInstitutions';

async function main() {
	await prisma.artsInstitutions.deleteMany();
	await prisma.arts.deleteMany();
	await prisma.authors.deleteMany();
	await prisma.institutions.deleteMany();
	await prisma.prefectures.deleteMany();

	await insertPrefectures();
	await insertAuthors();
	await insertArts();
	await insertInstitutions();
	await insertArtInstitution();
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
