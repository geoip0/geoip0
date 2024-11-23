import { drizzle } from "db0/integrations/drizzle/index";
import { eq } from "drizzle-orm";
import {
  bigint,
  char,
  pgTable,
  primaryKey,
  real,
  varchar,
} from "drizzle-orm/pg-core";

export const db = useDatabase();

export const drizzleDb = drizzle(db);

export const ip2location_db11 = pgTable(
  "ip2location_db11",
  {
    ip_from: bigint({ mode: "number" }).notNull(),
    ip_to: bigint({ mode: "number" }).notNull(),
    country_code: char("country_code", { length: 2 }).notNull(),
    country_name: varchar("country_name", { length: 64 }).notNull(),
    region_name: varchar("region_name", { length: 128 }).notNull(),
    city_name: varchar("city_name", { length: 128 }).notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    zip_code: varchar("zip_code", { length: 30 }).notNull(),
    time_zone: varchar("time_zone", { length: 8 }).notNull(),
  },
  (table) => ({
    ip2location_db1_pkey: primaryKey({
      columns: [table.ip_from, table.ip_to],
    }),
  })
);
