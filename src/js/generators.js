/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  yield new allowedTypes[Math.floor(Math.random() * allowedTypes.length)](maxLevel);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const result = [];
  for (let i = 0; i < characterCount; i += 1) {
    result.push(characterGenerator(allowedTypes, maxLevel));
  }
  return result;
}
