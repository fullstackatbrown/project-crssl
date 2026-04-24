import { type SchemaTypeDefinition } from "sanity";

import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { paperType } from "./paperType";
import { peopleType } from "./peopleType";
import { projectType } from "./projectType";
import { resourcesType } from "./resourcesType";
import { newsType } from "./newsType";
import { aboutType } from "./aboutType";
import { datasetType } from "./datasetType";
import { dataPageType } from "./dataPageHeroSingleton";
import { explainerSectionType } from "./explainerCategoryType";
import { funderType } from "./funderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    blockContentType,
    examplePersonType,
    exampleDatasetType,
    paperType,
    projectType,
    peopleType,
    resourcesType,
    newsType,
    aboutType,
    datasetType,
    dataPageType,
    explainerSectionType,
    funderType,
  ],
};
