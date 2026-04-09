export const HOME_QUERY = `{
  "datasets": *[_type == "dataset"] | order(date desc)[0..2] {
    _id,
    "title": name,
    description,
    date,
    "imageUrl": image.asset->url,
  },
  "tools": *[_type == "resourcesPage"][0].sections[0..2] {
    "_id": title,
    title,
    description,
    "items": items[0..2] {
      label,
      description,
      resourceType,
      url,
      "fileUrl": file.asset->url,
      "imageUrl": image.asset->url,
      youtubeUrl,
    }
  },
}`