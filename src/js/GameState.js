export default class GameState {
  constructor() {
    this.turn = 'Player';
    this.points = 0;
    this.level = '';
    this.charsPositions = [];
  }

  static nextTurn() {
    if (this.turn === 'Player') {
      this.turn = 'Computer';
    } else {
      this.turn = 'Player';
    }
  }

  static addPoints(number) {
    this.points += number;
  }

  static showPoints() {
    return this.points;
  }

  static resetPoints() {
    this.points = 0;
  }
}
