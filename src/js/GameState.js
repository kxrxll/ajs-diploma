export default class GameState {
  constructor(turn = 'Player', level, charsPositions) {
    this.turn = turn;
    this.points = 0;
    this.level = level;
    this.charsPositions = charsPositions;
  }

  nextTurn() {
    if (this.turn === 'Player') {
      this.turn = 'Computer';
    } else {
      this.turn = 'Player';
    }
  }

  addPoints(number) {
    this.points += number;
  }

  showPoints() {
    return this.points;
  }

  resetPoints() {
    this.points = 0;
  }
}
