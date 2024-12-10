import { writeFileSync } from "node:fs";
import Papa from "papaparse";

const datasetsURL =
  "https://cdn.jsdelivr.net/gh/datasets/country-codes@main/data/country-codes.csv";

const data = await fetch(datasetsURL).then((res) => res.text());

writeFileSync("./assets/datasets/country_codes.csv", data.trim());

const json = Papa.parse(data.trim(), {
  header: true,
});

writeFileSync(
  "./assets/datasets/country_codes.json",
  JSON.stringify(json.data, null, 2),
);
