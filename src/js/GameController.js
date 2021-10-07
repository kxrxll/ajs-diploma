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
    // Новая игра
    this.gamePlay.addNewGameListener(this.onNewGameClick.bind(this));
    // Добавление ховера и анховера на ячейки
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    // Добавлениеи клика на ячейки
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    // Отрисовка поля
    this.gamePlay.drawUi('prairie');
    // TODO: load saved stated from stateService
  }

  onNewGameClick() {
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
  }

  onCellClick(index) {
    if (this.charsPositions.find((item) => item.position === index)) {
      const clickedChar = this.charsPositions.find((item) => item.position === index);
      // Перевыбор персонажа
      if (clickedChar.character.type === 'swordsman' || clickedChar.character.type === 'bowman' || clickedChar.character.type === 'magician') {
        // Обработка предыдущего выбранного
        if (this.selected.index !== undefined) {
          this.gamePlay.deselectCell(this.selected.index);
        }
        this.selected.character = clickedChar.character;
        this.selected.index = index;
        this.gamePlay.selectCell(index);
      } else if ((clickedChar.character.type === 'daemon' || clickedChar.character.type === 'undead' || clickedChar.character.type === 'vampire') && this.selected.index !== undefined) {
        // Проверяем через функцию разрешения атаки
        const board = this.gamePlay.boardSize;
        const attack = possibleAttack(this.selected.index, board, this.selected.character.type);
        if (attack.indexOf(index) !== -1) {
          // Атака на персонажа
          clickedChar.character.getHit(this.selected.character.attack);
          if (clickedChar.character.health === 0) {
            // Проверка на гибель персонажа и удаление его из массива игровых персонажей
            this.charsPositions.splice(
              this.charsPositions.indexOf(clickedChar),
              1,
            );
            // Отрисовываем поле без персонажа
            this.gamePlay.redrawPositions(this.charsPositions);
            // Курсор типа покидает ячейку
            this.onCellLeave(index);
          }
        }
      } else if ((clickedChar.character.type === 'deamon' || clickedChar.character.type === 'undead' || clickedChar.character.type === 'vampire') && this.selected.index === undefined) {
        // Попытка выбора вражеского персонажа
        GamePlay.showError('Enemy character can not be selected!');
      }
    } else if (this.selected.index !== undefined) {
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
        // Туду – переход хода здесь
      }
    }
  }

  onCellEnter(index) {
    if (this.charsPositions.find((item) => item.position === index)) {
      // Логика для ячейки с персонажем
      const clickedChar = this.charsPositions.find((item) => item.position === index);
      if (clickedChar.character.type === 'swordsman' || clickedChar.character.type === 'bowman' || clickedChar.character.type === 'magician') {
        // Здесь перевыбор своего персонажа
        this.gamePlay.setCursor(cursors.pointer);
      } else if (this.selected.character !== undefined && (
        clickedChar.character.type === 'undead'
        || clickedChar.character.type === 'daemon'
        || clickedChar.character.type === 'vampire')) {
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
        clickedChar.character.type === 'undead'
        || clickedChar.character.type === 'daemon'
        || clickedChar.character.type === 'vampire')) {
        this.gamePlay.setCursor(cursors.notallowed);
      }
      const level = String.fromCodePoint(0x1F396);
      const attack = String.fromCodePoint(0x2694);
      const defence = String.fromCodePoint(0x1F6E1);
      const health = String.fromCodePoint(0x2764);
      this.gamePlay.showCellTooltip(`${clickedChar.character.level}${level} ${clickedChar.character.attack}${attack} ${clickedChar.character.defence}${defence} ${clickedChar.character.health}${health}`, index);
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

  onCellLeave(index) {
    if (this.selected.index !== index) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.hideCellTooltip(index);
  }
}
