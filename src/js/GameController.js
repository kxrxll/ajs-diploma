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
import randomMove from './randomMove';

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
      this.gamePlay.deselectCell(this.selected.position);
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
        if (this.selected.position !== undefined) {
          this.gamePlay.deselectCell(this.selected.position);
        }
        this.selected.character = clickedChar.character;
        this.selected.position = index;
        this.gamePlay.selectCell(index);
      } else if ((clickedChar.character.type === 'daemon' || clickedChar.character.type === 'undead' || clickedChar.character.type === 'vampire') && this.selected.position !== undefined) {
        // Функция атаки врага
        if (this.attackCharacter(clickedChar, this.selected)) {
          this.gamePlay.redrawPositions(this.attackCharacter(clickedChar, this.selected));
          // Типа покидаем ячейку для предотвращения миссклика
          this.onCellLeave(index);
          this.computerTurn();
        }
      } else if ((clickedChar.character.type === 'deamon' || clickedChar.character.type === 'undead' || clickedChar.character.type === 'vampire') && this.selected.index === undefined) {
        // Попытка выбора вражеского персонажа
        GamePlay.showError('Enemy character can not be selected!');
      }
    } else if (this.moveCharecter(index, this.selected)) {
      // Функция движения по полю возвращает массив в случае возможности хода
      this.gamePlay.redrawPositions(this.moveCharecter(index, this.selected));
      this.gamePlay.deselectCell(this.selected.position);
      this.selected.position = index;
      this.gamePlay.selectCell(index);
      // Переход хода
      this.computerTurn();
    } else {
      this.gamePlay.redrawPositions(this.charsPositions);
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
        const attack = possibleAttack(this.selected.position, board, this.selected.character.type);
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
    } else if (this.selected.position !== index && this.selected.character !== undefined) {
      // Логика для ячейки без персонажа
      const board = this.gamePlay.boardSize;
      const moves = possibleMoves(this.selected.position, board, this.selected.character.type);
      if (moves.indexOf(index) !== -1) {
        this.gamePlay.selectCell(index, 'green');
        this.gamePlay.setCursor(cursors.pointer);
      }
    }
  }

  onCellLeave(index) {
    if (this.selected.position !== index) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor(cursors.auto);
    this.gamePlay.hideCellTooltip(index);
  }

  moveCharecter(index, selected) {
    // Логика перехода на ячейку
    const board = this.gamePlay.boardSize;
    const moves = possibleMoves(selected.position, board, selected.character.type);
    if (moves.indexOf(index) !== -1) {
      const result = this.charsPositions;
      // Находим в массиве персонажа по позиции
      for (const char of result) {
        if (char.position === selected.position) {
          // Меняем ему позицию в массиве
          char.position = index;
        }
      }
      return result;
    }
    return false;
  }

  attackCharacter(victim, attacker) {
    const board = this.gamePlay.boardSize;
    const attack = possibleAttack(attacker.position, board, attacker.character.type);
    if (attack.indexOf(victim.position) !== -1) {
    // Атака на персонажа
      victim.character.getHit(attacker.character.attack);
      const result = this.charsPositions;
      if (victim.character.health === 0) {
      // Проверка на гибель персонажа и удаление его из массива игровых персонажей
        result.splice(result.indexOf(victim), 1);
        /*
        // Отрисовываем поле без персонажа
        this.gamePlay.redrawPositions(this.charsPositions);
        */
        // Курсор типа покидает ячейку
        this.onCellLeave(victim.position);
        if (victim.character.type === 'swordsman' || victim.character.type === 'bowman' || victim.character.type === 'magician') {
          this.gamePlay.deselectCell(victim.position);
        }
      }
      return result;
    }
    return false;
  }

  computerTurn() {
    // Передача хода в геймстейт
    GameState.nextTurn();
    // Определение случайного хода
    const nextMove = randomMove(this.charsPositions, this.gamePlay.boardSize);
    // Определение и применение хода компьютера
    if (nextMove.attack) {
      this.attackCharacter(nextMove.attack, nextMove.char);
    } else if (nextMove.move) {
      this.moveCharecter(nextMove.move, nextMove.char);
    }
    this.gamePlay.redrawPositions(this.charsPositions);
    GameState.nextTurn();
  }
}
