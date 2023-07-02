import { PrismaClient } from '@prisma/client';
import { uuidv7 } from '@kripod/uuidv7';

const prisma = new PrismaClient();

import {
	art1Id,
	art2Id,
	art3Id,
	art4Id,
	art5Id,
	art6Id,
	art7Id,
	art8Id,
	art9Id,
	art10Id,
} from './arts';

import {
	institution1Id,
	institution2Id,
	institution3Id,
	institution4Id,
	institution5Id,
	institution6Id,
	institution7Id,
	institution8Id,
	institution9Id,
	institution10Id,
} from './institution';

export const art_institution = async () => {
	const now = new Date();
	// authors.seed.tsで生成されたUUIDをエクスポートする
	await prisma.arts_Institutions.createMany({
		data: [
			{
				art_id: art1Id,
				institution_id: institution1Id,
			},
			{
				art_id: art2Id,
				institution_id: institution2Id,
			},
			{
				art_id: art3Id,
				institution_id: institution3Id,
			},
			{
				art_id: art4Id,
				institution_id: institution4Id,
			},
			{
				art_id: art5Id,
				institution_id: institution5Id,
			},
			{
				art_id: art6Id,
				institution_id: institution6Id,
			},
			{
				art_id: art7Id,
				institution_id: institution7Id,
			},
			{
				art_id: art8Id,
				institution_id: institution8Id,
			},
			{
				art_id: art9Id,
				institution_id: institution9Id,
			},
			{
				art_id: art10Id,
				institution_id: institution10Id,
			},
		],
	});
};
