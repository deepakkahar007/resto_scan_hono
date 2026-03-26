import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "@/env/envSchema";
import * as schema from "./models/index";
import { relations } from "./models/relations";

const client = neon(env.DATABASE_URL);

export const db = drizzle({ client, schema, relations });
