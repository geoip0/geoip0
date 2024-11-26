CREATE TABLE ip2location_db11(
	ip_from bigint NOT NULL,
	ip_to bigint NOT NULL,
	country_code character(2) NOT NULL,
	country_name character varying(64) NOT NULL,
	region_name character varying(128) NOT NULL,
	city_name character varying(128) NOT NULL,
	latitude real NOT NULL,
	longitude real NOT NULL,
	zip_code character varying(30) NOT NULL,
	time_zone character varying(8) NOT NULL,
	CONSTRAINT ip2location_db11_pkey PRIMARY KEY (ip_from, ip_to)
);

CREATE TABLE ip2location_db11_ipv6(
	ip_from decimal(39, 0) NOT NULL,
	ip_to decimal(39, 0) NOT NULL,
	country_code character(2) NOT NULL,
	country_name character varying(64) NOT NULL,
	region_name character varying(128) NOT NULL,
	city_name character varying(128) NOT NULL,
	latitude real NOT NULL,
	longitude real NOT NULL,
	zip_code character varying(30) NOT NULL,
	time_zone character varying(8) NOT NULL,
	CONSTRAINT ip2location_db11_ipv6_pkey PRIMARY KEY (ip_from, ip_to)
);

CREATE TABLE ip2location_px11(
	ip_from bigint NOT NULL,
	ip_to bigint NOT NULL,
	proxy_type character varying(3) NOT NULL,
	country_code character(2) NOT NULL,
	country_name character varying(64) NOT NULL,
	region_name character varying(128) NOT NULL,
	city_name character varying(128) NOT NULL,
	isp character varying(256) NOT NULL,
	domain character varying(128) NOT NULL,
	usage_type character varying(11) NOT NULL,
	asn character varying(10) NOT NULL,
	"as" character varying(256) NOT NULL,
	last_seen character varying(10) NOT NULL,
	threat character varying(128) NOT NULL,
	provider character varying(128) NOT NULL,
	CONSTRAINT ip2location_px11_pkey PRIMARY KEY (ip_from, ip_to)
);

CREATE TABLE ip2location_px11_ipv6(
	ip_from decimal(39, 0) NOT NULL,
	ip_to decimal(39, 0) NOT NULL,
	proxy_type character varying(3) NOT NULL,
	country_code character(2) NOT NULL,
	country_name character varying(64) NOT NULL,
	region_name character varying(128) NOT NULL,
	city_name character varying(128) NOT NULL,
	isp character varying(256) NOT NULL,
	domain character varying(128) NOT NULL,
	usage_type character varying(11) NOT NULL,
	asn character varying(10) NOT NULL,
	"as" character varying(256) NOT NULL,
	last_seen character varying(10) NOT NULL,
	threat character varying(128) NOT NULL,
	provider character varying(128) NOT NULL,
	CONSTRAINT ip2location_px11_ipv6_pkey PRIMARY KEY (ip_from, ip_to)
);

CREATE TABLE ip2location_asn(
	ip_from bigint NOT NULL,
	ip_to bigint NOT NULL,
	cidr character varying(43) NOT NULL,
	asn character varying(10) NOT NULL,
	"as" character varying(256) NOT NULL,
	CONSTRAINT ip2location_asn_pkey PRIMARY KEY (ip_from, ip_to)
);

CREATE TABLE ip2location_asn_ipv6(
	ip_from decimal(39, 0) NOT NULL,
	ip_to decimal(39, 0) NOT NULL,
	cidr character varying(43) NOT NULL,
	asn character varying(10) NOT NULL,
	"as" character varying(256) NOT NULL,
	CONSTRAINT ip2location_asn_ipv6_pkey PRIMARY KEY (ip_from, ip_to)
);