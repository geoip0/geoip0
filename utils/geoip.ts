import type { Context } from "@netlify/edge-functions";
import { geolocation } from "@vercel/functions";
import { and, gte, lte } from "drizzle-orm";
import type { H3Event } from "h3";
import { IPTools } from "ip2location-nodejs";

export interface GeoIP {
  type: string;
  ip: string;
}

export interface GeoIP2Location extends GeoIP {
  country_name: string;
  country_code: string;
  region_name: string;
  city_name: string;
  latitude: number;
  longitude: number;
  time_zone: string;
  zip_code: string;
}

export interface GeoIPCloudflare extends GeoIP {
  country_name: string;
}

export interface GeoIPVercel extends GeoIP {
  continent_code: string;
  country_code: string;
  region_code: string;
  city_name: string;
  latitude: number;
  lontitude: number;
  time_zone: string;
  flag: string;
}

export interface GeoIPNetlify extends GeoIP {
  country_name: string;
  country_code: string;
  city_name: string;
  latitude: number;
  lontitude: number;
  time_zone: string;
}

export async function useGeoIP2Location(
  event: H3Event,
  paramIP?: string,
): Promise<GeoIP2Location | GeoIP> {
  const ipTools = new IPTools();
  const ip = ipTools.isIPV4(paramIP)
    ? paramIP
    : getHeaders(event)["x-forwarded-for"];
  const decimal = ipTools.ipV4ToDecimal(ip);
  const {
    public: {
      postgres: { url },
    },
  } = useRuntimeConfig();

  if (!url) {
    return {
      type: "default",
      ip,
    };
  }

  const [data] = await drizzleDb
    .select()
    .from(ip2location_db11)
    .where(
      and(
        lte(ip2location_db11.ip_from, decimal),
        gte(ip2location_db11.ip_to, decimal),
      ),
    )
    .limit(1);

  return data
    ? {
        type: "IP2Location",
        ip,
        country_name: data[0].country_name,
        country_code: data[0].country_code,
        region_name: data[0].region_name,
        city_name: data[0].city_name,
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        time_zone: data[0].time_zone,
        zip_code: data[0].zip_code,
      }
    : { type: "default", ip };
}

export function useGeoIPCloudflare(event: H3Event): GeoIPCloudflare {
  const headers = getHeaders(event);

  return {
    type: "cloudflare",
    ip: headers["cf-connecting-ip"],
    country_name: headers["cf-ipcountry"],
  };
}

export function useGeoIPVercel(event: H3Event): GeoIPVercel {
  const headers = getHeaders(event);

  const geo = geolocation(event);

  return {
    type: "vercel",
    ip: headers["x-forwarded-for"],
    continent_code: headers["x-vercel-ip-continent"],
    country_code: geo.country,
    region_code: geo.countryRegion,
    city_name: geo.city,
    latitude: Number(geo.latitude),
    lontitude: Number(geo.longitude),
    time_zone: headers["x-vercel-ip-timezone"],
    flag: geo.flag,
  };
}

export function useGeoIPNetlify(event: H3Event): GeoIPNetlify {
  const context = event.context as Context;

  const geo = context.geo;

  return {
    type: "netlify",
    ip: context.ip,
    country_name: geo.country.name,
    country_code: geo.country.code,
    city_name: geo.city,
    latitude: geo.latitude,
    lontitude: geo.longitude,
    time_zone: geo.timezone,
  };
}
