import { PrismaClient } from '@prisma/client';
import { uuidv7 } from '@kripod/uuidv7';
const prisma = new PrismaClient();

export const INSTITUTION_IDS = {
	institution1Id: uuidv7(),
	institution2Id: uuidv7(),
	institution3Id: uuidv7(),
	institution4Id: uuidv7(),
	institution5Id: uuidv7(),
	institution6Id: uuidv7(),
	institution7Id: uuidv7(),
	institution8Id: uuidv7(),
	institution9Id: uuidv7(),
	institution10Id: uuidv7(),
} as const;

export const institution = async () => {
	await prisma.institutions.createMany({
		data: [
			{
				id: INSTITUTION_IDS.institution1Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution2Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution3Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution4Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution5Id,
				admission_fee_description:
					'	ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution6Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution7Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution8Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution9Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: INSTITUTION_IDS.institution10Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
		],
	});
};
