import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { datasetType } from './datasetType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, datasetType],
}
