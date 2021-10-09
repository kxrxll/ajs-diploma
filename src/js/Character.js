export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
  }

  getHit(damage) {
    const realDamage = Math.max(damage - this.defence, damage * 0.1);
    this.health -= realDamage;
    console.log(`${this.type} gets ${realDamage} damage`);
    if (this.health < 0) {
      this.health = 0;
      console.log(`${this.type} dies`);
    }
  }
}
