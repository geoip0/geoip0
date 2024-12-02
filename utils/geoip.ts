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
  country_code: string;
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

export const getIP = (event: H3Event) => {
  const headers = getHeaders(event);

  return (
    headers["cf-connecting-ip"] ||
    getRequestIP(event, { xForwardedFor: true }) ||
    headers["x-real-ip"]
  );
};

export const getGeoIP2Location = defineCachedFunction(
  async (event: H3Event, paramIP?: string) => {
    {
      const ipTools = new IPTools();
      const ip = ipTools.isIPV4(paramIP) ? paramIP : getIP(event);
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
        .from(ip2LocationDb11)
        .where(
          and(
            lte(ip2LocationDb11.ip_from, decimal),
            gte(ip2LocationDb11.ip_to, decimal),
          ),
        )
        .limit(1);

      if (data) {
        const geoIP2Location: GeoIP2Location = {
          type: "IP2Location",
          ip,
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

      const geoIP: GeoIP = { type: "default", ip };

      return geoIP;
    }
  },
  {
    name: "ip2location",
    group: "geoip",
    maxAge: 60 * 60 * 24 * 14, // 14 days
    staleMaxAge: 60 * 60 * 24 * 7, // 7 days
  },
);

export function getGeoIPCloudflare(event: H3Event): GeoIPCloudflare {
  const headers = getHeaders(event);

  return {
    type: "cloudflare",
    ip: headers["cf-connecting-ip"] || getIP(event),
    country_code: headers["cf-ipcountry"],
  };
}

export function getGeoIPVercel(event: H3Event): GeoIPVercel {
  const headers = getHeaders(event);

  const geo = geolocation(event);

  const geoLatitude = Number(geo.latitude) || undefined;
  const geoLongitude = Number(geo.longitude) || undefined;

  return {
    type: "vercel",
    ip: getIP(event),
    continent_code: headers["x-vercel-ip-continent"],
    country_code: geo.country,
    region_code: geo.countryRegion,
    city_name: geo.city,
    latitude: geoLatitude,
    lontitude: geoLongitude,
    time_zone: headers["x-vercel-ip-timezone"],
    flag: geo.flag,
  };
}

export function getGeoIPNetlify(event: H3Event): GeoIPNetlify {
  const headers = getHeaders(event);

  const geo = JSON.parse(atob(headers["x-nf-geo"])) as Context["geo"];

  return {
    type: "netlify",
    ip: getIP(event),
    country_name: geo?.country?.name,
    country_code: geo?.country?.code,
    city_name: geo?.city,
    latitude: geo?.latitude,
    lontitude: geo?.longitude,
    time_zone: geo?.timezone,
  };
}
