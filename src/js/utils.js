export function calcTileType(index, boardSize) {
  if (((index + 1) % boardSize === 1) && (index >= boardSize * boardSize - boardSize)) {
    return 'bottom-left';
  }
  if (((index + 1) % boardSize === 1) && (index >= 0 && index < boardSize)) {
    return 'top-left';
  }
  if (((index + 1) % boardSize === 0) && (index >= boardSize * boardSize - boardSize)) {
    return 'bottom-right';
  }
  if (((index + 1) % boardSize === 0) && (index >= 0 && index < boardSize)) {
    return 'top-right';
  }
  if ((index + 1) % boardSize === 1) {
    return 'left';
  }
  if (index >= 0 && index < boardSize) {
    return 'top';
  }
  if (index >= boardSize * boardSize - boardSize) {
    return 'bottom';
  }
  if ((index + 1) % boardSize === 0) {
    return 'right';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
