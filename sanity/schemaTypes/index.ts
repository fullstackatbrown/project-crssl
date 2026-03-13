import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { peopleType } from "./peopleType";
import { projectType } from './projectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, examplePersonType, exampleDatasetType, projectType, peopleType],
}
