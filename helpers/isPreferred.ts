export const isPreferred = (affiliations: string[] | undefined) =>
  affiliations &&
  affiliations.length > 0 &&
  !affiliations.every(function(v) {
    return v === null;
  })
    ? !affiliations.map((affiliation: string) => affiliation.toLowerCase()).includes('phcs network')
    : true;
