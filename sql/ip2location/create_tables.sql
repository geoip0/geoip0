CREATE TABLE IF NOT EXISTS "ip2location_asn" (
	"ip_from" bigint NOT NULL,
	"ip_to" bigint NOT NULL,
	"cidr" varchar(43) NOT NULL,
	"asn" varchar(10) NOT NULL,
	"as" varchar(256) NOT NULL,
	CONSTRAINT "ip2location_asn_pkey" PRIMARY KEY("ip_from","ip_to")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ip2location_asn_ipv6" (
	"ip_from" numeric(39, 0) NOT NULL,
	"ip_to" numeric(39, 0) NOT NULL,
	"cidr" varchar(43) NOT NULL,
	"asn" varchar(10) NOT NULL,
	"as" varchar(256) NOT NULL,
	CONSTRAINT "ip2location_asn_ipv6_pkey" PRIMARY KEY("ip_from","ip_to")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ip2location_db11" (
	"ip_from" bigint NOT NULL,
	"ip_to" bigint NOT NULL,
	"country_code" char(2) NOT NULL,
	"country_name" varchar(64) NOT NULL,
	"region_name" varchar(128) NOT NULL,
	"city_name" varchar(128) NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"zip_code" varchar(30) NOT NULL,
	"time_zone" varchar(8) NOT NULL,
	CONSTRAINT "ip2location_db11_pkey" PRIMARY KEY("ip_from","ip_to")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ip2location_db11_ipv6" (
	"ip_from" numeric(39, 0) NOT NULL,
	"ip_to" numeric(39, 0) NOT NULL,
	"country_code" char(2) NOT NULL,
	"country_name" varchar(64) NOT NULL,
	"region_name" varchar(128) NOT NULL,
	"city_name" varchar(128) NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"zip_code" varchar(30) NOT NULL,
	"time_zone" varchar(8) NOT NULL,
	CONSTRAINT "ip2location_db11_ipv6_pkey" PRIMARY KEY("ip_from","ip_to")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ip2location_px11" (
	"ip_from" bigint NOT NULL,
	"ip_to" bigint NOT NULL,
	"proxy_type" varchar(3) NOT NULL,
	"country_code" char(2) NOT NULL,
	"country_name" varchar(64) NOT NULL,
	"region_name" varchar(128) NOT NULL,
	"city_name" varchar(128) NOT NULL,
	"isp" varchar(256) NOT NULL,
	"domain" varchar(128) NOT NULL,
	"usage_type" varchar(11) NOT NULL,
	"asn" varchar(10) NOT NULL,
	"as" varchar(256) NOT NULL,
	"last_seen" varchar(10) NOT NULL,
	"threat" varchar(128) NOT NULL,
	"provider" varchar(128) NOT NULL,
	CONSTRAINT "ip2location_px11_pkey" PRIMARY KEY("ip_from","ip_to")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ip2location_px11_ipv6" (
	"ip_from" numeric(39, 0) NOT NULL,
	"ip_to" numeric(39, 0) NOT NULL,
	"proxy_type" varchar(3) NOT NULL,
	"country_code" char(2) NOT NULL,
	"country_name" varchar(64) NOT NULL,
	"region_name" varchar(128) NOT NULL,
	"city_name" varchar(128) NOT NULL,
	"isp" varchar(256) NOT NULL,
	"domain" varchar(128) NOT NULL,
	"usage_type" varchar(11) NOT NULL,
	"asn" varchar(10) NOT NULL,
	"as" varchar(256) NOT NULL,
	"last_seen" varchar(10) NOT NULL,
	"threat" varchar(128) NOT NULL,
	"provider" varchar(128) NOT NULL,
	CONSTRAINT "ip2location_px11_ipv6_pkey" PRIMARY KEY("ip_from","ip_to")
);
