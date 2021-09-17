import Character from './Character';

export default class Deamon extends Character {
  constructor(level, type = 'daemon') {
    super(level);
    this.attack = 10;
    this.defence = 40;
    this.health = 100;
    this.type = type;
  }
}
