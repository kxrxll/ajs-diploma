import Character from './Character';

export default class Swordsman extends Character {
  constructor(level, type = 'swordsman') {
    super(level);
    this.attack = 40;
    this.defence = 10;
    this.health = 100;
    this.type = type;
  }

  static isAllowedToMove(index, boardsize) {
    const result = [];
    if (index + 1 < boardsize) {
      result.push(index + 1);
    }
    if (index - 1 > 0) {
      result.push(index - 1);
    }
    if (index + boardsize < boardsize * boardsize) {
      result.push(index + boardsize);
    }
    if (index + boardsize + 1 < boardsize * boardsize) {
      result.push(index + boardsize + 1);
    }
    if (index + boardsize - 1 < boardsize * boardsize) {
      result.push(index + boardsize - 1);
    }
    if (index - boardsize > 0) {
      result.push(index - boardsize);
    }
    if (index - boardsize + 1 > 0) {
      result.push(index - boardsize + 1);
    }
    if (index - boardsize - 1 > 0) {
      result.push(index - boardsize - 1);
    }
    return result;
  }
}
