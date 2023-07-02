import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { prefecture } from './prefecture';
import { author } from './author';
import { art } from './art';
import { institution } from './institution';
import { artInstitution } from './artInstitution';

async function main() {
	await prisma.artsInstitutions.deleteMany();
	await prisma.arts.deleteMany();
	await prisma.authors.deleteMany();
	await prisma.institutions.deleteMany();
	await prisma.prefectures.deleteMany();

	await prefecture();
	await author();
	await art();
	await institution();
	await artInstitution();
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
