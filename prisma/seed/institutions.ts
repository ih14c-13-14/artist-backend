import { PrismaClient } from '@prisma/client';
import { INSTITUTION_COMMON_DATA, INSTITUTION_IDS } from './data/institutions';

const prisma = new PrismaClient();

export const institution = async () => {
	const institutionsData = INSTITUTION_IDS.map((institution_id, index) => ({
		id: institution_id,
		...INSTITUTION_COMMON_DATA[index],
	}));
	await prisma.institutions.createMany({
		data: institutionsData,
	});
};
