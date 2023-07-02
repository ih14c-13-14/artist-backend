import { PrismaClient } from '@prisma/client';
import { AUTHOR_COMMON_DATA, AUTHOR_IDS } from './data/authors';

const prisma = new PrismaClient();

export const author = async () => {
	const authorsData = AUTHOR_IDS.map((authorId) => ({
		id: authorId,
		...AUTHOR_COMMON_DATA[authorId],
	}));

	await prisma.authors.createMany({
		data: authorsData,
	});
};
