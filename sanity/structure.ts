import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Site Contents")
    .items([
      S.documentTypeListItem("projectType").title("Research - Projects"),
      S.documentTypeListItem("paperType").title("Research - Papers"),
      S.documentTypeListItem("explainerSectionType").title(
        "Research - Explainers",
      ),
      S.documentTypeListItem("peopleType").title("People"),
      S.documentTypeListItem("dataset").title("Datasets"),
      S.documentTypeListItem("newsType").title("News"),
      S.documentTypeListItem("funderType").title("Funders"),
      S.divider(),
      S.listItem()
        .title("Homepage Header (Singleton)")
        .child(
          S.document()
            .schemaType("homeHeader")
            .documentId("homeHeader"),
        ),
      S.listItem()
        .title("Footer (Singleton)")
        .child(
          S.document()
            .schemaType("footer")
            .documentId("footer"),
        ),
      S.listItem()
        .title("Experts / People Page Header (Singleton)")
        .child(
          S.document()
            .schemaType("peoplePage")
            .documentId("peoplePage"),
        ),
      S.documentTypeListItem("dataPage").title("Data Page Header (Singleton)"),
      S.documentTypeListItem("researchPage").title(
        "Research Page Header (Singleton)",
      ),
      S.documentTypeListItem("resourcesPage").title(
        "Resources Page (Singleton)",
      ),
      S.documentTypeListItem("about").title("About Page (Singleton)"),
      S.divider(),
      // ...S.documentTypeListItems().filter(
      //   (item) =>
      //     item.getId() &&
      //     ![
      //       "projectType",
      //       "paperType",
      //       "dataset",
      //       "peopleType",
      //       "exampleDataset",
      //       "examplePerson",
      //       "dataPage",
      //       "researchPage",
      //       "explainerSectionType",
      //       "resourcesPage",
      //     ].includes(item.getId()!),
      // ),
      // S.divider(),
    ]);
