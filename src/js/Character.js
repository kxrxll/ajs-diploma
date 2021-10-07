export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    /*
    if ((new.target.name !== 'Bowman')
     && (new.target.name !== 'Deamon')
      && (new.target.name !== 'Mage')
       && (new.target.name !== 'Swordsman')
        && (new.target.name !== 'Undead')
         && (new.target.name !== 'Vampire')
    ) {
      throw new Error('sthap it!');
    }
    */
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
