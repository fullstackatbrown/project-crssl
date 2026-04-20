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

/**
 * Builds a search query for filtering datasets based on a search term
 * @param searchTerm The user's search input, case insensitive
 * @param searchAllFields If true, each word must appear in at least one field (OR across fields, AND across words).
 *                        If false, all words must appear in the same field (checked per field, OR across fields).
 * @param allowPartialMatch If searchAllFields is false: use OR instead of AND between words within a field.
 *                          If searchAllFields is true: has no effect — words are always joined with AND.
 * @returns A GROQ query string that can be appended to filter datasets
 */
export const buildSearchQuery = (
  searchTerm: string,
  searchFields: string[],
  searchAllFields: boolean = false,
  allowPartialMatch: boolean = false
): string => {
  if (searchFields.length === 0) {
    return '';
  }
  const words: string[] = searchTerm.trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  const intraOp = allowPartialMatch ? '||' : '&&';
  let query: string = '';
  const buildSubQuery = (field: string, word: string): string => `${field} match "*${word}*"`;
  const results: string[] = [];
  if (searchAllFields) {
    // construct boolean for every word
    for (const word of words) {
      const wordQuery = searchFields.map(field => buildSubQuery(field, word)).join(` || `);
      results.push(wordQuery);
    }
    query = results.join(` && `);
  } else {
    // construct boolean for every field
    for (const field of searchFields) {
      const fieldQuery = words.map(word => buildSubQuery(field, word)).join(` ${intraOp} `);
      results.push(fieldQuery);
    }
    query = results.join(' || ');
  }
  return `(${query})`;
}

/**
 * Build part of a search query that filters by having all specified tags
 * @param tags An array of tag strings to filter by
 * @param tagFieldName The name of the field to search on
 * @returns A GROQ query string that can be appended using &&
 */
export const buildTagQuery = (
  tags: string[],
  tagFieldName: string
): string => {
  if (tags.length === 0) return '';
  const tagConditions = tags.map(tag => `"${tag}" in ${tagFieldName}`).join(' && ');
  return `(${tagConditions})`;
}
