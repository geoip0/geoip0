import { drizzle } from "db0/integrations/drizzle/index";
import {
  bigint,
  char,
  numeric,
  pgTable,
  primaryKey,
  real,
  varchar,
} from "drizzle-orm/pg-core";

export const db = useDatabase();

export const drizzleDb = drizzle(db);

export const ip2LocationAsn = pgTable(
  "ip2location_asn",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_from: bigint("ip_from", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_to: bigint("ip_to", { mode: "number" }).notNull(),
    cidr: varchar({ length: 43 }).notNull(),
    asn: varchar({ length: 10 }).notNull(),
    as: varchar({ length: 256 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationAsnPkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_asn_pkey",
      }),
    };
  }
);

export const ip2LocationAsnIpv6 = pgTable(
  "ip2location_asn_ipv6",
  {
    ip_from: numeric("ip_from", { precision: 39, scale: 0 }).notNull(),
    ip_to: numeric("ip_to", { precision: 39, scale: 0 }).notNull(),
    cidr: varchar({ length: 43 }).notNull(),
    asn: varchar({ length: 10 }).notNull(),
    as: varchar({ length: 256 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationAsnIpv6Pkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_asn_ipv6_pkey",
      }),
    };
  }
);

export const ip2LocationDb11 = pgTable(
  "ip2location_db11",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_from: bigint("ip_from", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_to: bigint("ip_to", { mode: "number" }).notNull(),
    country_code: char("country_code", { length: 2 }).notNull(),
    country_name: varchar("country_name", { length: 64 }).notNull(),
    region_name: varchar("region_name", { length: 128 }).notNull(),
    city_name: varchar("city_name", { length: 128 }).notNull(),
    latitude: real().notNull(),
    longitude: real().notNull(),
    zip_code: varchar("zip_code", { length: 30 }).notNull(),
    time_zone: varchar("time_zone", { length: 8 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationDb11Pkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_db11_pkey",
      }),
    };
  }
);

export const ip2LocationDb11Ipv6 = pgTable(
  "ip2location_db11_ipv6",
  {
    ip_from: numeric("ip_from", { precision: 39, scale: 0 }).notNull(),
    ip_to: numeric("ip_to", { precision: 39, scale: 0 }).notNull(),
    country_code: char("country_code", { length: 2 }).notNull(),
    country_name: varchar("country_name", { length: 64 }).notNull(),
    region_name: varchar("region_name", { length: 128 }).notNull(),
    city_name: varchar("city_name", { length: 128 }).notNull(),
    latitude: real().notNull(),
    longitude: real().notNull(),
    zip_code: varchar("zip_code", { length: 30 }).notNull(),
    time_zone: varchar("time_zone", { length: 8 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationDb11Ipv6Pkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_db11_ipv6_pkey",
      }),
    };
  }
);

export const ip2LocationPx11 = pgTable(
  "ip2location_px11",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_from: bigint("ip_from", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    ip_to: bigint("ip_to", { mode: "number" }).notNull(),
    proxyType: varchar("proxy_type", { length: 3 }).notNull(),
    country_code: char("country_code", { length: 2 }).notNull(),
    country_name: varchar("country_name", { length: 64 }).notNull(),
    region_name: varchar("region_name", { length: 128 }).notNull(),
    city_name: varchar("city_name", { length: 128 }).notNull(),
    isp: varchar({ length: 256 }).notNull(),
    domain: varchar({ length: 128 }).notNull(),
    usage_type: varchar("usage_type", { length: 11 }).notNull(),
    asn: varchar({ length: 10 }).notNull(),
    as: varchar({ length: 256 }).notNull(),
    last_seen: varchar("last_seen", { length: 10 }).notNull(),
    threat: varchar({ length: 128 }).notNull(),
    provider: varchar({ length: 128 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationPx11Pkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_px11_pkey",
      }),
    };
  }
);

export const ip2LocationPx11Ipv6 = pgTable(
  "ip2location_px11_ipv6",
  {
    ip_from: numeric("ip_from", { precision: 39, scale: 0 }).notNull(),
    ip_to: numeric("ip_to", { precision: 39, scale: 0 }).notNull(),
    proxyType: varchar("proxy_type", { length: 3 }).notNull(),
    country_code: char("country_code", { length: 2 }).notNull(),
    country_name: varchar("country_name", { length: 64 }).notNull(),
    region_name: varchar("region_name", { length: 128 }).notNull(),
    city_name: varchar("city_name", { length: 128 }).notNull(),
    isp: varchar({ length: 256 }).notNull(),
    domain: varchar({ length: 128 }).notNull(),
    usage_type: varchar("usage_type", { length: 11 }).notNull(),
    asn: varchar({ length: 10 }).notNull(),
    as: varchar({ length: 256 }).notNull(),
    last_seen: varchar("last_seen", { length: 10 }).notNull(),
    threat: varchar({ length: 128 }).notNull(),
    provider: varchar({ length: 128 }).notNull(),
  },
  (table) => {
    return {
      ip2LocationPx11Ipv6Pkey: primaryKey({
        columns: [table.ip_from, table.ip_to],
        name: "ip2location_px11_ipv6_pkey",
      }),
    };
  }
);
