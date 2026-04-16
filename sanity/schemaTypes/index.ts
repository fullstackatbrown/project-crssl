import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { paperType } from "./paperType";
import { peopleType } from "./peopleType";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fa79a99cd25d9bf4db4c3e13cf77ed3eca0b7a10
import { projectType } from "./projectType";
import { resourcesType } from "./resourcesType";
import { datasetType } from "./datasetType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    examplePersonType,
    exampleDatasetType,
    projectType,
    peopleType,
    authorType,
    paperType,
    resourcesType,
    datasetType,
  ],
};
<<<<<<< HEAD
=======
import { projectType } from './projectType'
import { datasetType } from "./datasetType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, examplePersonType, exampleDatasetType,  projectType, peopleType, datasetType],
}
>>>>>>> 6c68149b018013aed2c140ed3fd91d2a6512186c
=======
>>>>>>> fa79a99cd25d9bf4db4c3e13cf77ed3eca0b7a10
