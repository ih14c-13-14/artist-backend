import { uuidv7 } from '@kripod/uuidv7';

export const INSTITUTION_COMMON_DATA = [
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'	ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
	{
		admission_fee_description:
			'ー（期間によっては作品鑑賞パスポートや共通チケットを販売）',
	},
] as const;

export const INSTITUTION_IDS: ReadonlyArray<string> = Array(
	INSTITUTION_COMMON_DATA.length,
).map(() => uuidv7());
