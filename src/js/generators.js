/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export default function generateTeam(allowedTypes, maxLevel, characterCount) {
  const characterGenerator = (types, lvl) => {
    const randomLevel = Math.ceil(Math.random() * lvl);
    return new types[Math.floor(Math.random() * types.length)](randomLevel);
  };
  const result = [];
  for (let i = 0; i < characterCount; i += 1) {
    result.push(characterGenerator(allowedTypes, maxLevel));
  }
  return result;
}
