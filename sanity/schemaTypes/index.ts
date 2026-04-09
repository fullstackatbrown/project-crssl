import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { peopleType } from "./peopleType";
import { projectType } from './projectType'
import { datasetType } from "./datasetType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, examplePersonType, exampleDatasetType,  projectType, peopleType, datasetType],
}
