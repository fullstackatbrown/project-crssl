<<<<<<< HEAD
import type { StructureResolver } from "sanity/structure";
=======
import type { StructureResolver } from 'sanity/structure'

const demoTypes = ['exampleDataset', 'examplePerson']
>>>>>>> 6c68149b018013aed2c140ed3fd91d2a6512186c

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
<<<<<<< HEAD
    .title("Content")
    .items([
      S.documentTypeListItem("projectType").title("Projects"),
      S.documentTypeListItem("paperType").title("Papers"),
      S.documentTypeListItem("authorType").title("Authors"),
      S.divider(),
      S.documentTypeListItem("peopleType").title("People"),
      S.documentTypeListItem("exampleDataset").title("Example Dataset"),
      S.documentTypeListItem("examplePerson").title("Example Person"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "projectType",
            "paperType",
            "authorType",
            "peopleType",
            "exampleDataset",
            "examplePerson",
          ].includes(item.getId()!),
      ),
    ]);
=======
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
>>>>>>> 6c68149b018013aed2c140ed3fd91d2a6512186c
