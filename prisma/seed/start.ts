import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { prefecture } from './prefecture';
import { author } from './author';
import { art } from './arts';
import { institution } from './institution';
import { art_institution } from './art_institution';

async function main() {
	await prisma.prefectures.deleteMany();
	await prisma.authors.deleteMany();
	await prisma.arts.deleteMany();
	await prisma.institutions.deleteMany();
	await prisma.arts_Institutions.deleteMany();

	await prefecture();
	await author();
	await art();
	await institution();
	await art_institution();
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
