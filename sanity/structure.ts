import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('TODO: Add custom structure here')
    .items([
      S.divider(),
    ])

    .title('Examples')
    .items([
      S.documentTypeListItem('exampleDataset').title('Example Dataset'),
      S.documentTypeListItem('examplePerson').title('Example Person'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['exampleDataset', 'examplePerson'].includes(item.getId()!),
      ),
    ])
