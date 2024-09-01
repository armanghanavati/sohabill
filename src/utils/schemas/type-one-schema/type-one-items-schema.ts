import { ItemsSchemaKeys, itemsBaseSchema, itemsIndexes } from "../itemsSchema";

const typeOneItemsIndexesToRemove = [
  "FlightType",
  "CotageNumber",
  "CotageDate",
  "SubscriptionNumber",
];

export const typeOneItemsIndexes: ItemsSchemaKeys = itemsIndexes.filter(
  (key) => typeOneItemsIndexesToRemove.includes(key) === false
);

export const typeOneItemsSchema = itemsBaseSchema;
