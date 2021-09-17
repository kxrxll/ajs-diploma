import Character from './Character';

export default class Undead extends Character {
  constructor(level, type = 'undead') {
    super(level);
    this.attack = 40;
    this.defence = 10;
    this.health = 100;
    this.type = type;
  }
}
