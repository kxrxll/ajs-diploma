const possibleMoves = (index, boardsize, char) => {
  const result = [];
  if (index + 1 < boardsize * boardsize) {
    result.push(index + 1);
  }
  if (index - 1 >= 0) {
    result.push(index - 1);
  }
  if (index + boardsize < boardsize * boardsize) {
    result.push(index + boardsize);
  }
  if (index + boardsize + 1 < boardsize * boardsize) {
    result.push(index + boardsize + 1);
  }
  if (index + boardsize - 1 < boardsize * boardsize) {
    result.push(index + boardsize - 1);
  }
  if (index - boardsize >= 0) {
    result.push(index - boardsize);
  }
  if (index - boardsize + 1 >= 0) {
    result.push(index - boardsize + 1);
  }
  if (index - boardsize - 1 >= 0) {
    result.push(index - boardsize - 1);
  }
  if (char === 'bowman' || char === 'swordsman') {
    if (index + 2 < boardsize * boardsize) {
      result.push(index + 2);
    }
    if (index - 2 >= 0) {
      result.push(index - 2);
    }
    if (index + boardsize * 2 < boardsize * boardsize) {
      result.push(index + boardsize * 2);
    }
    if (index - boardsize * 2 >= 0) {
      result.push(index - boardsize * 2);
    }
    if (index + boardsize * 2 + 2 < boardsize * boardsize) {
      result.push(index + boardsize * 2 + 2);
    }
    if (index + boardsize * 2 - 2 < boardsize * boardsize) {
      result.push(index + boardsize * 2 - 2);
    }
    if (index - boardsize * 2 + 2 >= 0) {
      result.push(index - boardsize * 2 + 2);
    }
    if (index - boardsize * 2 - 2 >= 0) {
      result.push(index - boardsize * 2 - 2);
    }
    if (char === 'swordsman') {
      if (index + 3 < boardsize * boardsize) {
        result.push(index + 3);
      }
      if (index - 3 >= 0) {
        result.push(index - 3);
      }
      if (index + boardsize * 3 < boardsize * boardsize) {
        result.push(index + boardsize * 3);
      }
      if (index - boardsize * 3 >= 0) {
        result.push(index - boardsize * 3);
      }
      if (index + boardsize * 3 + 3 < boardsize * boardsize) {
        result.push(index + boardsize * 3 + 3);
      }
      if (index + boardsize * 3 - 3 < boardsize * boardsize) {
        result.push(index + boardsize * 3 - 3);
      }
      if (index - boardsize * 3 + 3 >= 0) {
        result.push(index - boardsize * 3 + 3);
      }
      if (index - boardsize * 3 - 3 >= 0) {
        result.push(index - boardsize * 3 - 3);
      }
    }
  }
  return result;
};

export default possibleMoves;
