import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Dataset')
    .items([
      S.documentTypeListItem('dataset').title('Datasets'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['dataset'].includes(item.getId()!),
      ),
    ])
