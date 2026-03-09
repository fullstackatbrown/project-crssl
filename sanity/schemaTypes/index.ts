import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { exampleDatasetType } from './exampleDatasetType'
import { examplePersonType } from './examplePersonType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, examplePersonType, exampleDatasetType],
}
