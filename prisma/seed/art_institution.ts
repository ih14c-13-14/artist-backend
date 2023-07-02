import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { ARTS_IDS } from './arts';

import { INSTITUTION_IDS } from './institution';

export const art_institution = async () => {
	// authors.seed.tsで生成されたUUIDをエクスポートする
	await prisma.arts_Institutions.createMany({
		data: [
			{
				art_id: ARTS_IDS.art1Id,
				institution_id: INSTITUTION_IDS.institution1Id,
			},
			{
				art_id: ARTS_IDS.art2Id,
				institution_id: INSTITUTION_IDS.institution2Id,
			},
			{
				art_id: ARTS_IDS.art3Id,
				institution_id: INSTITUTION_IDS.institution3Id,
			},
			{
				art_id: ARTS_IDS.art4Id,
				institution_id: INSTITUTION_IDS.institution4Id,
			},
			{
				art_id: ARTS_IDS.art5Id,
				institution_id: INSTITUTION_IDS.institution5Id,
			},
			{
				art_id: ARTS_IDS.art6Id,
				institution_id: INSTITUTION_IDS.institution6Id,
			},
			{
				art_id: ARTS_IDS.art7Id,
				institution_id: INSTITUTION_IDS.institution7Id,
			},
			{
				art_id: ARTS_IDS.art8Id,
				institution_id: INSTITUTION_IDS.institution8Id,
			},
			{
				art_id: ARTS_IDS.art9Id,
				institution_id: INSTITUTION_IDS.institution9Id,
			},
			{
				art_id: ARTS_IDS.art10Id,
				institution_id: INSTITUTION_IDS.institution10Id,
			},
		],
	});
};
