import { Province, City } from "../types";
import { loadJsonData } from "../utils";

export const provinceData = loadJsonData<Province[]>("src/data/provinces.json");
export const citiesData = loadJsonData<City[]>("src/data/cities.json");
