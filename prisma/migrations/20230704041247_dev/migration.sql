-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RESET', 'EMAIL_CHANGE');

-- CreateTable
CREATE TABLE "Users" (
    "id" CHAR(36) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" CHAR(60) NOT NULL,
    "age_group" SMALLINT NOT NULL,
    "gender" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "prefecture_id" CHAR(36) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prefectures" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(4) NOT NULL,

    CONSTRAINT "Prefectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institutions" (
    "id" CHAR(36) NOT NULL,
    "admission_fee_description" TEXT NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arts" (
    "id" CHAR(36) NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT true,
    "name" VARCHAR(255) NOT NULL,
    "name_kana" VARCHAR(255) NOT NULL,
    "created_year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_path" TEXT[],
    "datetime_description" TEXT NOT NULL,
    "closed_day_description" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "author_id" CHAR(36) NOT NULL,

    CONSTRAINT "Arts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authors" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "name_kana" VARCHAR(255) NOT NULL,
    "image_path" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtsInstitutions" (
    "art_id" CHAR(36) NOT NULL,
    "institution_id" CHAR(36) NOT NULL,

    CONSTRAINT "ArtsInstitutions_pkey" PRIMARY KEY ("art_id","institution_id")
);

-- CreateTable
CREATE TABLE "ArtsUsers" (
    "art_id" CHAR(36) NOT NULL,
    "user_id" CHAR(36) NOT NULL,

    CONSTRAINT "ArtsUsers_pkey" PRIMARY KEY ("art_id","user_id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "user_id" CHAR(36) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prefectures_name_key" ON "Prefectures"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_prefecture_id_fkey" FOREIGN KEY ("prefecture_id") REFERENCES "Prefectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arts" ADD CONSTRAINT "Arts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtsInstitutions" ADD CONSTRAINT "ArtsInstitutions_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Arts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtsInstitutions" ADD CONSTRAINT "ArtsInstitutions_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institutions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtsUsers" ADD CONSTRAINT "ArtsUsers_art_id_fkey" FOREIGN KEY ("art_id") REFERENCES "Arts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtsUsers" ADD CONSTRAINT "ArtsUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
