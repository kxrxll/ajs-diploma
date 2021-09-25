export default class GameState {
  constructor() {
    this.turn = 'Player';
  }

  static nextTurn() {
    if (this.turn === 'Player') {
      this.turn = 'Computer';
    } else {
      this.turn = 'Player';
    }
  }
}
