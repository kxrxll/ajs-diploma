import PositionedCharacter from './PositionedCharacter';
import generateTeam from './generators';
import Swordsman from './Swordsman';
import Bowman from './Bowman';
import Mage from './Mage';
import Undead from './Undead';
import Deamon from './Deamon';
import Vampire from './Vampire';
import GameState from './GameState';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.charsPositions = [];
    this.selectedCell = '';
  }

  init() {
    // Отрисовка поля
    this.gamePlay.drawUi('prairie');
    // Новая игра
    this.gamePlay.addNewGameListener(() => {
      const board = this.gamePlay.boardSize;
      const playerRandomField = () => {
        const column = Math.floor(Math.random() * 2);
        const row = (board * Math.floor(Math.random() * board));
        return column + row;
      };
      const computerRandomField = () => {
        const column = Math.floor(Math.random() * 2 + this.gamePlay.boardSize - 2);
        const row = (board * Math.floor(Math.random() * board));
        return column + row;
      };
      const toPlayerPosition = (char) => new PositionedCharacter(char, playerRandomField());
      const toComputerPosition = (char) => new PositionedCharacter(char, computerRandomField());
      const firstLevelTeamPlayer = generateTeam([Swordsman, Bowman, Mage], 1, 2);
      const PlayerPositioned = firstLevelTeamPlayer.map((item) => toPlayerPosition(item));
      const firstLevelTeamComputer = generateTeam([Undead, Deamon, Vampire], 1, 2);
      const ComputerPositioned = firstLevelTeamComputer.map((item) => toComputerPosition(item));
      this.charsPositions = PlayerPositioned.concat(ComputerPositioned);
      this.gamePlay.redrawPositions(this.charsPositions);
    });
    // Добавление ховера и анховера на ячейки
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    // Добавлениеи клика на ячейки
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    // TODO: load saved stated from stateService
  }

  onCellClick(index) {
    for (const item of this.charsPositions) {
      if (item.position === index) {
        if (item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician') {
          if (this.selectedCell !== '') {
            this.gamePlay.deselectCell(this.selectedCell);
          }
          this.selectedCell = index;
          this.gamePlay.selectCell(index);
        } else {
          GamePlay.showError('Enemy character can not be selected!');
        }
      }
    }
  }

  onCellEnter(index) {
    for (const item of this.charsPositions) {
      if (item.position === index) {
        const level = String.fromCodePoint(0x1F396);
        const attack = String.fromCodePoint(0x2694);
        const defence = String.fromCodePoint(0x1F6E1);
        const health = String.fromCodePoint(0x2764);
        this.gamePlay.showCellTooltip(`${item.character.level}${level} ${item.character.attack}${attack} ${item.character.defence}${defence} ${item.character.health}${health}`, index);
      }
    }
  }

  onCellLeave(index) {
    this.gamePlay.hideCellTooltip(index);
  }
}
