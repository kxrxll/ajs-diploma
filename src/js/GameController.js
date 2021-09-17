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
    // Отлов контекста для слушателей
    this.class = this;
  }

  init() {
    // Отрисовка мира
    this.gamePlay.drawUi('prairie');
    const firstLevelTeamPlayer = generateTeam([Swordsman, Bowman,Mage], 1, 2);
    // Слушатель новой игры и вспомогательные функции
    this.gamePlay.newGameEl.addEventListener('click', () => {
      const board = this.class.gamePlay.boardSize;
      const playerRandomField = () => {
        const column = Math.floor(Math.random() * 2);
        const row = (board * Math.floor(Math.random() * board));
        return column + row;
      };
      const computerRandomField = () => {
        const column = Math.floor(Math.random() * 2 + this.class.gamePlay.boardSize - 2);
        const row = (board * Math.floor(Math.random() * board));
        return column + row;
      };
      const toPlayerPosition = (char) => new PositionedCharacter(char, playerRandomField());
      const toComputerPosition = (char) => new PositionedCharacter(char, computerRandomField());
      const PlayerPositioned = firstLevelTeamPlayer.map((item) => toPlayerPosition(item));
      const firstLevelTeamComputer = generateTeam([Undead, Deamon, Vampire], 1, 2);
      const ComputerPositioned = firstLevelTeamComputer.map((item) => toComputerPosition(item));
      this.class.gamePlay.redrawPositions(PlayerPositioned.concat(ComputerPositioned));
    });
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
