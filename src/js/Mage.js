import Character from './Character';

export default class Mage extends Character {
  constructor(level, type = 'magician') {
    super(level);
    this.attack = 10;
    this.defence = 40;
    this.health = 100;
    this.type = type;
  }
}
