import type { Context } from "@netlify/edge-functions";
import { geolocation } from "@vercel/functions";
import { defu } from "defu";
import { and, gte, lte } from "drizzle-orm";
import type { H3Event } from "h3";
import { IPTools } from "ip2location-nodejs";
import {
  drizzleDb,
  ip2LocationDb11,
  ip2LocationDb11Ipv6,
} from "~/utils/db/ip2Location";

export interface GeoIP {
  type: "ipv4" | "ipv6" | string;
  database:
    | "geoip"
    | "rdap"
    | "ip2location"
    | "maxmind"
    | "dbip"
    | "cloudflare"
    | "netlify"
    | "vercel"
    | string;
  ip: string;
  continent_name?: string;
  continent_code?: string;
  country_name?: string;
  country_code?: string;
  region_name?: string;
  region_code?: string;
  city_name?: string;
  latitude?: number;
  longitude?: number;
  time_zone?: string;
  zip_code?: string;
  flag?: string;
}

export const defineGeoIP = (params: GeoIP): GeoIP => {
  return defu(params, {
    type: "",
    database: "",
    ip: "",
    continent_name: "",
    continent_code: "",
    country_name: "",
    country_code: "",
    region_name: "",
    region_code: "",
    city_name: "",
    latitude: 0,
    longitude: 0,
    time_zone: "",
    zip_code: "",
    flag: "",
  });
};

export const getIP = (event: H3Event) => {
  const headers = getHeaders(event);

  return (
    headers["cf-connecting-ip"] ||
    getRequestIP(event, { xForwardedFor: true }) ||
    headers["x-real-ip"]
  );
};

export const getGeoIPRdap = defineCachedFunction(
  async (event: H3Event, paramIP?: string) => {
    const ip = paramIP || getIP(event);

    const rdap = await $fetch(`/rdap/ip/${ip}`);

    if (rdap?.country) {
      return defineGeoIP({
        type: getIPVersion(ip),
        database: "rdap",
        ip,
        country_code: rdap.country,
      });
    }

    return defineGeoIP({
      type: getIPVersion(ip),
      database: "",
      ip,
    });
  },
  {
    name: "rdap",
    group: "geoip",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  }
);

export const getGeoIP2Location = defineCachedFunction(
  async (event: H3Event, paramIP?: string) => {
    {
      const ipTools = new IPTools();

      const ip = paramIP || getIP(event);

      const {
        public: {
          postgres: { url },
        },
      } = useRuntimeConfig();

      if (ipTools.isIPV4(ip)) {
        if (!url) {
          return getGeoIPRdap(event, ip);
        }

        const decimal = ipTools.ipV4ToDecimal(ip);

        const [data] = await drizzleDb
          .select()
          .from(ip2LocationDb11)
          .where(
            and(
              lte(ip2LocationDb11.ip_from, decimal),
              gte(ip2LocationDb11.ip_to, decimal)
            )
          )
          .limit(1);

        if (data) {
          const geoIP2Location = defineGeoIP({
            type: "ipv4",
            database: "ip2location",
            ip: ip,
            country_name: data.country_name,
            country_code: data.country_code,
            region_name: data.region_name,
            city_name: data.city_name,
            latitude: data.latitude,
            longitude: data.longitude,
            time_zone: data.time_zone,
            zip_code: data.zip_code,
          });

          return geoIP2Location;
        }
      }

      if (ipTools.isIPV6(ip)) {
        if (!url) {
          return getGeoIPRdap(event, ip);
        }

        const decimal = ipTools.ipV6ToDecimal(ip);

        const [data] = await drizzleDb
          .select()
          .from(ip2LocationDb11Ipv6)
          .where(
            and(
              lte(ip2LocationDb11Ipv6.ip_from, decimal),
              gte(ip2LocationDb11Ipv6.ip_to, decimal)
            )
          )
          .limit(1);

        if (data) {
          const geoIP2Location: GeoIP = {
            type: "ipv6",
            database: "ip2location",
            ip: ip,
            country_name: data.country_name,
            country_code: data.country_code,
            region_name: data.region_name,
            city_name: data.city_name,
            latitude: data.latitude,
            longitude: data.longitude,
            time_zone: data.time_zone,
            zip_code: data.zip_code,
          };

          return geoIP2Location;
        }
      }

      const geoIP: GeoIP = defineGeoIP({
        type: "",
        database: "",
        ip: getIP(event),
      });

      return geoIP;
    }
  },
  {
    name: "ip2location",
    group: "geoip",
    maxAge: 60 * 60 * 24 * 14, // 14 days
    staleMaxAge: 60 * 60 * 24 * 7, // 7 days
  }
);

export async function getGeoIPCloudflare(event: H3Event): Promise<GeoIP> {
  const headers = getHeaders(event);

  const ip = getIP(event);

  const geoIP: GeoIP = defineGeoIP({
    type: getIPVersion(ip),
    database: "cloudflare",
    ip,
    country_code: headers["cf-ipcountry"],
  });

  return geoIP;
}

export async function getGeoIPVercel(event: H3Event): Promise<GeoIP> {
  const headers = getHeaders(event);

  const geo = geolocation(event);

  const geoLatitude = Number(geo.latitude) || undefined;
  const geoLongitude = Number(geo.longitude) || undefined;

  const ip = getIP(event);

  const geoIP: GeoIP = defineGeoIP({
    type: getIPVersion(ip),
    database: "vercel",
    ip,
    continent_code: headers["x-vercel-ip-continent"],
    country_code: geo.country,
    region_code: geo.countryRegion,
    city_name: geo.city,
    latitude: geoLatitude,
    longitude: geoLongitude,
    time_zone: headers["x-vercel-ip-timezone"],
    flag: geo.flag,
  });

  return geoIP;
}

export async function getGeoIPNetlify(event: H3Event): Promise<GeoIP> {
  const headers = getHeaders(event);

  const geo = JSON.parse(atob(headers["x-nf-geo"])) as Context["geo"];

  const ip = getIP(event);

  const geoIP: GeoIP = defineGeoIP({
    type: getIPVersion(ip),
    database: "netlify",
    ip,
    country_name: geo?.country?.name,
    country_code: geo?.country?.code,
    city_name: geo?.city,
    latitude: geo?.latitude,
    longitude: geo?.longitude,
    time_zone: geo?.timezone,
  });

  return geoIP;
}
