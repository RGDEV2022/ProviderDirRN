export function sentenceCase(input?: string, lowercaseBefore?: string) {
  input = input === undefined || input === null ? '' : input;
  if (lowercaseBefore) {
    input = input.toLowerCase();
  }
  return input.toString().replace(/(^|\. *)([a-z])/g, function(match, separator, char) {
    return separator + char.toUpperCase();
  });
}
