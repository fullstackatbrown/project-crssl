import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { paperType } from "./paperType";
import { peopleType } from "./peopleType";
<<<<<<< HEAD
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
=======
import { projectType } from './projectType'
import { datasetType } from "./datasetType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, examplePersonType, exampleDatasetType,  projectType, peopleType, datasetType],
}
>>>>>>> 6c68149b018013aed2c140ed3fd91d2a6512186c
