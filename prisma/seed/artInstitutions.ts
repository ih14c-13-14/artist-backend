import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { ART_IDS } from './data/arts';
import { INSTITUTION_IDS } from './data/institutions';

export const artInstitution = async () => {
	if (ART_IDS.length !== INSTITUTION_IDS.length)
		throw new Error('IDの数が合いません');
	const artsInstitutionsData = ART_IDS.map((artId, index) => ({
		art_id: artId,
		institution_id: INSTITUTION_IDS[index],
	}));

	await prisma.artsInstitutions.createMany({
		data: artsInstitutionsData,
	});
};
