import { PrismaClient } from '@prisma/client';
import { AUTHOR_COMMON_DATA, AUTHOR_IDS } from './data/authors';

const prisma = new PrismaClient();

export const insertAuthors = async () => {
	const authorsData = AUTHOR_IDS.map((authorId, index) => ({
		id: authorId,
		...AUTHOR_COMMON_DATA[index],
	}));

	await prisma.authors.createMany({
		data: authorsData,
	});
};
