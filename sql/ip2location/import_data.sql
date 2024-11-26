\COPY ip2location_db11      FROM 'IP2LOCATION-LITE-DB11.CSV'      WITH CSV QUOTE AS '"';

\COPY ip2location_db11_ipv6 FROM 'IP2LOCATION-LITE-DB11.IPV6.CSV' WITH CSV QUOTE AS '"';

\COPY ip2location_px11      FROM 'IP2PROXY-LITE-PX11.CSV'         WITH CSV QUOTE AS '"';

\COPY ip2location_px11_ipv6 FROM 'IP2PROXY-LITE-PX11.IPV6.CSV'    WITH CSV QUOTE AS '"';

\COPY ip2location_asn       FROM 'IP2LOCATION-LITE-ASN.CSV'       WITH CSV QUOTE AS '"';

\COPY ip2location_asn_ipv6  FROM 'IP2LOCATION-LITE-ASN.IPV6.CSV'  WITH CSV QUOTE AS '"';