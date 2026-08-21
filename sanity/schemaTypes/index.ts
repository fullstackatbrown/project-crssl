import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { exampleDatasetType } from "./exampleDatasetType";
import { examplePersonType } from "./examplePersonType";
import { paperType } from "./paperType";
import { peopleType } from "./peopleType";
import { projectPageSectionType } from "./projectPageSectionType";
import { projectType } from "./projectType";
import { resourcesType } from "./resourcesType";
import { newsType } from "./newsType";
import { aboutType } from "./aboutType";
import { datasetType } from "./datasetType";
import { dataPageType } from "./dataPageHeroSingleton";
import { footerType } from "./footerSingleton";
import { homeHeaderType } from "./homeHeaderSingleton";
import { peoplePageType } from "./peoplePageHeroSingleton";
import { researchPageType } from "./researchPageHeroSingleton";
import { explainerSectionType } from "./explainerCategoryType";
import { funderType } from "./funderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    examplePersonType,
    exampleDatasetType,
    paperType,
    projectPageSectionType,
    projectType,
    peopleType,
    resourcesType,
    newsType,
    aboutType,
    datasetType,
    dataPageType,
    footerType,
    homeHeaderType,
    peoplePageType,
    researchPageType,
    explainerSectionType,
    funderType,
  ],
};
