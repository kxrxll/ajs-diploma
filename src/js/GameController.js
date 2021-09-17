import PositionedCharacter from './PositionedCharacter';
import generateTeam from './generators';
import Swordsman from './Swordsman';
import Bowman from './Bowman';
import Mage from './Mage';
import Undead from './Undead';
import Deamon from './Deamon';
import Vampire from './Vampire';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    this.gamePlay.drawUi('prairie');
    const firstLevelTeamPlayer = generateTeam([Swordsman, Bowman], 1, 2);
    const playerPositions = Math.floor(Math.random() * (this.gamePlay.boardSize * 2));
    const firstLevelTeamPlayerPositioned = firstLevelTeamPlayer.forEach((char) => new PositionedCharacter(char, playerPositions));
    const firstLevelTeamComputer = generateTeam([Undead, Deamon, Vampire], 1, 2);
    const computerPositions = this.gamePlay.boardSize * this.gamePlay.boardSize - Math.ceil(Math.random() * (this.gamePlay.boardSize * 2));
    const firstLevelTeamComputerPositioned = firstLevelTeamComputer.forEach((char) => new PositionedCharacter(char, computerPositions));
    this.gamePlay.redrawPositions(firstLevelTeamPlayerPositioned.concat(firstLevelTeamComputerPositioned));
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
