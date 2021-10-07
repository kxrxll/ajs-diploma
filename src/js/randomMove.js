import possibleAttack from './possibleAttack';
import possibleMoves from './possibleMoves';

const randomMove = (charsPositions, boardSize) => {
  // Фильтрация массива по типу персонажей
  const comuputerPositions = charsPositions.filter((item) => item.character.type === 'daemon' || item.character.type === 'undead' || item.character.type === 'vampire');
  const playerPositions = charsPositions.filter((item) => item.character.type === 'swordsman' || item.character.type === 'bowman' || item.character.type === 'magician');
  // Выбор рандомного персонажа
  const charToMove = comuputerPositions[Math.floor(Math.random() * comuputerPositions.length)];
  // Проверка на возможность рандомной аттаки
  const tilesToAttack = possibleAttack(charToMove.position, boardSize, charToMove.position);
  // массив для случайной атаки
  const possibleAttackChars = [];
  for (let i = 0; i < tilesToAttack.length; i += 1) {
    for (let k = 0; k < playerPositions.length; k += 1) {
      if (tilesToAttack[i] === playerPositions[k].position) {
        possibleAttackChars.push(playerPositions[k]);
      }
    }
  }
  // Случайный выбор жертвы
  const randomVictim = possibleAttackChars[Math.floor(Math.random() * possibleAttackChars.length)];
  // Возвращаем обьект если найдена жертва
  if (randomVictim) {
    return {
      attack: randomVictim,
      char: charToMove,
    };
  }
  // Случайный ход
  const tilesToMove = possibleMoves(charToMove.position, boardSize, charToMove.position);
  const randomMoveTile = tilesToMove[Math.floor(Math.random() * tilesToMove.length)];
  // Возвращаем обьект с полем хода
  return {
    move: randomMoveTile,
    char: charToMove,
  };
};

export default randomMove;
