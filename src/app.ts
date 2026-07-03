import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { citiesData, provinceData } from "./data/index.js";
import { City, Province } from "./types.js";
import { findByProperty, parseParams, sendJson } from "./utils.js";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || "/";
  const method = req.method;

  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  if (method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  // 1. GET /provinces
  if (url === "/provinces") {
    return sendJson(res, 200, provinceData);
  }

  // 2. GET /provinces/:id
  if (url.startsWith("/provinces/") && !url.endsWith("/cities")) {
    const { id } = parseParams(url, "/provinces/:id");
    if (!id) return sendJson(res, 404, { error: "Province not found" });

    const isNumber = !isNaN(Number(id));
    const province = isNumber
      ? findByProperty(provinceData, "id", Number(id))
      : findByProperty(provinceData, "name", id);

    if (!province) return sendJson(res, 404, { error: "Province not found" });
    return sendJson(res, 200, province);
  }

  // 3. GET /provinces/:id/cities
  if (url.startsWith("/provinces/") && url.endsWith("/cities")) {
    const { id } = parseParams(url, "/provinces/:id/cities");
    if (!id) return sendJson(res, 404, { error: "Province not found" });

    const isNumber = !isNaN(Number(id));
    const province = isNumber
      ? (findByProperty(provinceData, "id", Number(id)) as Province)
      : (findByProperty(provinceData, "name", id) as Province);

    if (!province) return sendJson(res, 404, { error: "Province not found" });

    const cities = citiesData.filter(
      (item) => item.province_id === province.id,
    );
    if (cities.length === 0)
      return sendJson(res, 404, { error: "No cities found" });
    return sendJson(res, 200, cities);
  }

  // 4. GET /cities
  if (url === "/cities") {
    return sendJson(res, 200, citiesData);
  }

  // 5. GET /cities/:id
  if (url.startsWith("/cities/") && !url.endsWith("/province")) {
    const { id } = parseParams(url, "/cities/:id");
    if (!id) return sendJson(res, 404, { error: "City not found" });

    const isNumber = !isNaN(Number(id));
    const city = isNumber
      ? findByProperty(citiesData, "id", Number(id))
      : findByProperty(citiesData, "name", id);

    if (!city) return sendJson(res, 404, { error: "City not found" });
    return sendJson(res, 200, city);
  }

  // 6. GET /cities/:id/province
  if (url.startsWith("/cities/") && url.endsWith("/province")) {
    const { id } = parseParams(url, "/cities/:id/province");
    if (!id) return sendJson(res, 404, { error: "City not found" });

    const isNumber = !isNaN(Number(id));
    const city = isNumber
      ? (findByProperty(citiesData, "id", Number(id)) as City)
      : (findByProperty(citiesData, "name", id) as City);

    if (!city) return sendJson(res, 404, { error: "City not found" });

    const province = findByProperty(provinceData, "id", city.province_id);
    if (!province) return sendJson(res, 404, { error: "Province not found" });
    return sendJson(res, 200, province);
  }

  return sendJson(res, 404, { error: "Route not found" });
});

server.listen(3000);
