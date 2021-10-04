import PositionedCharacter from './PositionedCharacter';
import generateTeam from './generators';
import Swordsman from './Swordsman';
import Bowman from './Bowman';
import Mage from './Mage';
import Undead from './Undead';
import Daemon from './Daemon';
import Vampire from './Vampire';
import GameState from './GameState';
import GamePlay from './GamePlay';
import cursors from './cursors';
import possibleMoves from './possibleMoves';
import possibleAttack from './possibleAttack';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.charsPositions = [];
    this.selected = {};
  }

  init() {
    // Отрисовка поля
    this.gamePlay.drawUi('prairie');
    // Новая игра
    this.gamePlay.addNewGameListener(() => {
      if (this.selected.character !== undefined) {
        this.gamePlay.deselectCell(this.selected.index);
        this.selected = {};
      }
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
      const firstLevelTeamComputer = generateTeam([Undead, Daemon, Vampire], 1, 2);
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
        // Перевыбор персонажа
        if (item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician') {
          // Обработка предыдущего выбранного
          if (this.selected.index !== undefined) {
            this.gamePlay.deselectCell(this.selected.index);
          }
          this.selected.character = item.character;
          this.selected.index = index;
          this.gamePlay.selectCell(index);
        } else if (item.character.type === 'deamon' || item.character.type === 'undead' || item.character.type === 'vampire') {
          // Попытка выбора вражеского персонажа
          if (this.selected.index !== undefined) {
            GamePlay.showError('Enemy character can not be selected!');
          } else {
            // логика атаки на вражеского персонажа
            console.log('hey');
          }
        }
      } else {
        // Логика перехода на ячейку
        const board = this.gamePlay.boardSize;
        const moves = possibleMoves(this.selected.index, board, this.selected.character.type);
        if (moves.indexOf(index) !== -1) {
          this.gamePlay.deselectCell(this.selected.index);
          // Находим в массиве персонажа по позиции
          for (const char of this.charsPositions) {
            if (char.position === this.selected.index) {
              // Меняем ему позицию в массиве
              char.position = index;
            }
          }
          // Отрисовываем поле заново
          this.selected.index = index;
          this.gamePlay.selectCell(index);
          this.gamePlay.redrawPositions(this.charsPositions);
        }
      }
    }
  }

  onCellEnter(index) {
    for (const item of this.charsPositions) {
      if (item.position === index) {
        // Логика для ячейки с персонажем
        if (item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician') {
          // Здесь перевыбор своего персонажа
          this.gamePlay.setCursor(cursors.pointer);
        } else if (this.selected.character !== undefined && (
          item.character.type === 'undead'
          || item.character.type === 'daemon'
          || item.character.type === 'vampire')) {
          // Логика при выбранном персонаже
          const board = this.gamePlay.boardSize;
          const attack = possibleAttack(this.selected.index, board, this.selected.character.type);
          if (attack.indexOf(index) !== -1) {
            this.gamePlay.setCursor(cursors.crosshair);
            this.gamePlay.selectCell(index, 'red');
          } else {
            this.gamePlay.setCursor(cursors.notallowed);
          }
        } else if (this.selected.character === undefined && (
          item.character.type === 'undead'
          || item.character.type === 'daemon'
          || item.character.type === 'vampire')) {
          this.gamePlay.setCursor(cursors.notallowed);
        }
        const level = String.fromCodePoint(0x1F396);
        const attack = String.fromCodePoint(0x2694);
        const defence = String.fromCodePoint(0x1F6E1);
        const health = String.fromCodePoint(0x2764);
        this.gamePlay.showCellTooltip(`${item.character.level}${level} ${item.character.attack}${attack} ${item.character.defence}${defence} ${item.character.health}${health}`, index);
      } else if (this.selected.index !== index && this.selected.character !== undefined) {
        // Логика для ячейки без персонажа
        const board = this.gamePlay.boardSize;
        const moves = possibleMoves(this.selected.index, board, this.selected.character.type);
        if (moves.indexOf(index) !== -1) {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor(cursors.pointer);
        }
      }
    }
  }

  onCellLeave(index) {
    if (this.selected.index !== index) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.hideCellTooltip(index);
  }
}
