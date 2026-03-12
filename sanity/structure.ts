import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
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
