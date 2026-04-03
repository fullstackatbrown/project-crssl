import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { paperType } from "./paperType";
import { peopleType } from "./peopleType";
import { projectType } from "./projectType";
import { resourcesType } from "./resourcesType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    examplePersonType,
    exampleDatasetType,
    projectType,
    peopleType,
    authorType,
    paperType,
    resourcesType
  ],
};
