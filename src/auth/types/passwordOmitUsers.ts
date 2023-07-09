import { Users } from '@prisma/client';

export type PasswordOmitUsers = Omit<Users, 'password'>;
