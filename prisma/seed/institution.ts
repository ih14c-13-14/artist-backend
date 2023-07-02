import { PrismaClient } from '@prisma/client';
import { uuidv7 } from '@kripod/uuidv7';
const prisma = new PrismaClient();
export const institution1Id = uuidv7();
export const institution2Id = uuidv7();
export const institution3Id = uuidv7();
export const institution4Id = uuidv7();
export const institution5Id = uuidv7();
export const institution6Id = uuidv7();
export const institution7Id = uuidv7();
export const institution8Id = uuidv7();
export const institution9Id = uuidv7();
export const institution10Id = uuidv7();

export const institution = async () => {
	await prisma.institutions.createMany({
		data: [
			{
				id: institution1Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution2Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution3Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution4Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution5Id,
				admission_fee_description:
					'	ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution6Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution7Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution8Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution9Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
			{
				id: institution10Id,
				admission_fee_description:
					'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
			},
		],
	});
};
