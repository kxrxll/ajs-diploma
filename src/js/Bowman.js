import Character from './Character';

export default class Bowman extends Character {
  constructor(level, type = 'bowman') {
    super(level);
    this.attack = 25;
    this.defence = 25;
    this.health = 100;
    this.type = type;
  }
}
