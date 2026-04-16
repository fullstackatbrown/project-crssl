<<<<<<< HEAD
<<<<<<< HEAD
import type { StructureResolver } from "sanity/structure";
=======
import type { StructureResolver } from 'sanity/structure'

const demoTypes = ['exampleDataset', 'examplePerson']
>>>>>>> 6c68149b018013aed2c140ed3fd91d2a6512186c
=======
import type { StructureResolver } from "sanity/structure";
>>>>>>> fa79a99cd25d9bf4db4c3e13cf77ed3eca0b7a10

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fa79a99cd25d9bf4db4c3e13cf77ed3eca0b7a10
    .title("Content")
    .items([
      S.documentTypeListItem("projectType").title("Projects"),
      S.documentTypeListItem("paperType").title("Papers"),
      S.documentTypeListItem("authorType").title("Authors"),
      S.documentTypeListItem("peopleType").title("People"),
      S.documentTypeListItem("dataset").title("Datasets"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "projectType",
            "paperType",
            "authorType",
            "dataset",
            "peopleType",
            "exampleDataset",
            "examplePerson",
          ].includes(item.getId()!),
      ),
      S.divider(),
      S.listItem()
        .title('Example Types for Developers')
        .child(
          S.list()
            .title('Examples')
            .items([
              S.documentTypeListItem("exampleDataset").title("Example Dataset"),
              S.documentTypeListItem("examplePerson").title("Example Person"),
            ])
        ),
    ]);
<<<<<<< HEAD
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
=======
>>>>>>> fa79a99cd25d9bf4db4c3e13cf77ed3eca0b7a10
