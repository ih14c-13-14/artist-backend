import { Arts, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { ART_COMMON_DATA, ART_IDS } from './data/arts';
import { AUTHOR_IDS } from './data/authors';

export const art = async () => {
	const artsData = ART_IDS.map((art_id, index) => ({
		id: art_id,
		...ART_COMMON_DATA[index],
		author_id: AUTHOR_IDS[index],
	})) satisfies ReadonlyArray<Arts>;

	await prisma.arts.createMany({
		data: artsData,
	});
};
