DROP TABLE "accounts";--> statement-breakpoint
DROP TABLE "authenticators";--> statement-breakpoint
DROP TABLE "sessions";--> statement-breakpoint
DROP TABLE "verification_tokens";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email" TO "email_address";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "image";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_address_unique" UNIQUE("email_address");