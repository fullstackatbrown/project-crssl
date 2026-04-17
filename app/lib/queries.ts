export const HOME_QUERY = `{
  "datasets": *[_type == "dataset"] | order(date desc)[0..2] {
    _id,
    "title": name,
    description,
    date,
    "imageUrl": image.asset->url,
  },
  "recentWork": *[_type == "paperType"] | order(date desc)[0..2] {
    _id,
    title,
    "description": abstract,
    date,
  },
  "news": *[_type == "newsType"] | order(date desc)[0..2] {
    _id,
    title,
    description,
    date,
    "imageUrl": image.asset->url,
  },
}`