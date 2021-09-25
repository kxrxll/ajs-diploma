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
}
