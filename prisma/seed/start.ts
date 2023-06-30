import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { prefecture } from './prefecture';

async function main() {
	await prisma.prefectures.deleteMany();
	await prefecture();
}

main()
	.catch((e) => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
