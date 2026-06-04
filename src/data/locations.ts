/**
 * locations.ts
 * SEO-targeted location pages derived from citiesData.
 * Source: 01-project-scaffold.md, 05-homepage-content-blueprint.md §11
 */
import type { LocationSEOItem } from "../types/data.types";
import { citiesData } from "./cities";

export const locationsData: LocationSEOItem[] = citiesData.map((city) => ({
  slug:  city.name.toLowerCase().replace(/\s+/g, "-"),
  city:  city.name,
  state: undefined, // Populate state strings when adding individual location pages
}));
