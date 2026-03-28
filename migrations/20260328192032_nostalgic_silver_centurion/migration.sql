CREATE TYPE "cuisine" AS ENUM('indian', 'chinese', 'italian', 'mexican', 'american', 'other');--> statement-breakpoint
CREATE TYPE "item_type" AS ENUM('veg', 'non_veg', 'egg', 'drink', 'other');--> statement-breakpoint
CREATE TABLE "addon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"item_id" uuid NOT NULL,
	"addon_name" varchar NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "address" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"state" varchar NOT NULL,
	"zip" varchar NOT NULL,
	"country" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"address_id" uuid NOT NULL,
	"category" varchar NOT NULL,
	"icon" varchar,
	"pin_to_top" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"description" text NOT NULL,
	"item_type" "item_type" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quantity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"item_id" uuid NOT NULL,
	"quantity" varchar NOT NULL,
	"price" integer NOT NULL,
	"discounted_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "restaurent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"organization_id" varchar NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"description" text NOT NULL,
	"category" varchar NOT NULL,
	"icon" varchar NOT NULL,
	"cover_image" varchar,
	"cuisine" "cuisine" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subcategory" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"restaurent_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	"subcategory" varchar NOT NULL
);
--> statement-breakpoint
CREATE INDEX "addon_item_id_idx" ON "addon" ("item_id");--> statement-breakpoint
CREATE INDEX "address_restaurant_id_idx" ON "address" ("restaurent_id");--> statement-breakpoint
CREATE INDEX "category_restaurant_id_idx" ON "category" ("restaurent_id");--> statement-breakpoint
CREATE INDEX "category_address_id_idx" ON "category" ("address_id");--> statement-breakpoint
CREATE INDEX "item_restaurant_id_idx" ON "item" ("restaurent_id");--> statement-breakpoint
CREATE INDEX "item_category_id_idx" ON "item" ("category_id");--> statement-breakpoint
CREATE INDEX "quantity_item_id_idx" ON "quantity" ("item_id");--> statement-breakpoint
CREATE INDEX "restaurent_organization_id_idx" ON "restaurent" ("organization_id");--> statement-breakpoint
CREATE INDEX "subcategory_restaurant_id_idx" ON "subcategory" ("restaurent_id");--> statement-breakpoint
CREATE INDEX "subcategory_category_id_idx" ON "subcategory" ("category_id");--> statement-breakpoint
ALTER TABLE "addon" ADD CONSTRAINT "addon_item_id_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_restaurent_id_restaurent_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent"("id");--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_restaurent_id_restaurent_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent"("id");--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_address_id_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address"("id");--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_restaurent_id_restaurent_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent"("id");--> statement-breakpoint
ALTER TABLE "item" ADD CONSTRAINT "item_category_id_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id");--> statement-breakpoint
ALTER TABLE "quantity" ADD CONSTRAINT "quantity_item_id_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id");--> statement-breakpoint
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_restaurent_id_restaurent_id_fkey" FOREIGN KEY ("restaurent_id") REFERENCES "restaurent"("id");--> statement-breakpoint
ALTER TABLE "subcategory" ADD CONSTRAINT "subcategory_category_id_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id");