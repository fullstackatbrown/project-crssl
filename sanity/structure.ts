import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
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
