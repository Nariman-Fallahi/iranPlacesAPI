import fs from "node:fs";
import { ServerResponse } from "node:http";
import path from "node:path";

export const findByProperty = <T extends { id?: number; name?: string }>(
  data: T[],
  property: keyof T,
  value: T[keyof T],
): T | undefined => {
  return data.find((item) => item[property] === value);
};

export const loadJsonData = <T>(filePath: string): T => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const jsonData = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(jsonData);
};

export const sendJson = (
  res: ServerResponse,
  status: number,
  data: unknown,
): void => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  });
  res.end(JSON.stringify(data));
};

export const parseParams = (
  urlStr: string,
  routePattern: string,
): Record<string, string> => {
  const urlParts = urlStr.split("?")[0].split("/");
  const patternParts = routePattern.split("/");
  const params: Record<string, string> = {};

  patternParts.forEach((part, index) => {
    if (part.startsWith(":")) {
      const paramName = part.slice(1);
      if (urlParts[index]) {
        params[paramName] = decodeURIComponent(urlParts[index]);
      }
    }
  });

  return params;
};
