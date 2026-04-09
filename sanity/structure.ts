import type { StructureResolver } from 'sanity/structure'

const demoTypes = ['exampleDataset', 'examplePerson']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Menu')
    .items([
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !demoTypes.includes(item.getId()!),
      ),
      S.divider(),
      S.listItem()
        .title('Example Types for Developers')
        .child(
          S.list()
            .title('Examples')
            .items([
              ...S.documentTypeListItems().filter(
                (item) => item.getId() && demoTypes.includes(item.getId()!),
              ),
            ]),
        )
    ])
