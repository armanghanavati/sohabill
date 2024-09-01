import { z } from "zod";
import { exportItemsSchema } from "./export-schema/export-items-schema";
import { goldItemsSchema } from "./gold-items-schema/gold-items-schema";
import { itemsBaseSchema } from "./itemsSchema";

const allItemsSchemas = itemsBaseSchema
  .merge(goldItemsSchema)
  .merge(exportItemsSchema);

export type AllItmesType = z.infer<typeof allItemsSchemas>;

export type AllItemsSchemaKeys = (keyof AllItmesType)[];
