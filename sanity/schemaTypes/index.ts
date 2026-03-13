import { type SchemaTypeDefinition } from 'sanity'

import { exampleDatasetType } from './exampleDatasetType'
import { examplePersonType } from './examplePersonType'
import { projectType } from './projectType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [examplePersonType, exampleDatasetType, projectType],
}
