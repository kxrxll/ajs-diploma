export function calcTileType(index, boardSize) {
  if (((index + 1) % boardSize === 1) && (index >= boardSize * boardSize - boardSize)) {
    return 'top-right';
  }
  if (((index + 1) % boardSize === 1) && (index >= 0 && index < boardSize)) {
    return 'top-left';
  }
  if ((index % boardSize === 0) && (index >= boardSize * boardSize - boardSize)) {
    return 'bottom-right';
  }
  if ((index % boardSize === 0) && (index >= 0 && index < boardSize)) {
    return 'bottom-left';
  }
  if ((index + 1) % boardSize === 1) {
    return 'top';
  }
  if (index >= 0 && index < boardSize) {
    return 'left';
  }
  if (index >= boardSize * boardSize - boardSize) {
    return 'right';
  }
  if (index % boardSize === 0) {
    return 'bottom';
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
