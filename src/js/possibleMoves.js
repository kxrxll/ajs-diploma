const possibleMoves = (index, boardsize, char) => {
  const result = [];
  const validate = (value, boardSize) => {
    if (value < boardSize * boardSize && value >= 0) {
      // Левый край
      if (index % boardsize === 0 && (value + 1) % boardsize === 0) {
        return false;
      }
      // Правый край
      if ((index + 1) % boardsize === 0 && value % boardsize === 0) {
        return false;
      }
      return true;
    }
    return false;
  };
  if (validate((index + 1), boardsize)) {
    result.push(index + 1);
  }
  if (validate((index - 1), boardsize)) {
    result.push(index - 1);
  }
  if (validate((index + boardsize), boardsize)) {
    result.push(index + boardsize);
  }
  if (validate((index + boardsize + 1), boardsize)) {
    result.push(index + boardsize + 1);
  }
  if (validate((index + boardsize - 1), boardsize)) {
    result.push(index + boardsize - 1);
  }
  if (validate((index - boardsize), boardsize)) {
    result.push(index - boardsize);
  }
  if (validate((index - boardsize + 1), boardsize)) {
    result.push(index - boardsize + 1);
  }
  if (validate((index - boardsize - 1), boardsize)) {
    result.push(index - boardsize - 1);
  }
  if (char === 'bowman' || char === 'swordsman' || char === 'vampire' || char === 'undead') {
    const validateSecond = (value, boardSize) => {
      if (value < boardSize * boardSize && value >= 0) {
        // Левый край
        if (index % boardsize === 0 && (value + 2) % boardsize === 0) {
          return false;
        }
        // Правый край
        if ((index + 1) % boardsize === 0 && (value - 1) % boardsize === 0) {
          return false;
        }
        // Предлевый край
        if ((index - 1) % boardsize === 0 && (value + 1) % boardsize === 0) {
          return false;
        }
        // Предправый край
        if ((index + 2) % boardsize === 0 && value % boardsize === 0) {
          return false;
        }
        return true;
      }
      return false;
    };
    if (validateSecond((index + 2), boardsize)) {
      result.push(index + 2);
    }
    if (validateSecond((index - 2), boardsize)) {
      result.push(index - 2);
    }
    if (validateSecond((index + boardsize * 2), boardsize)) {
      result.push(index + boardsize * 2);
    }
    if (validateSecond((index - boardsize * 2), boardsize)) {
      result.push(index - boardsize * 2);
    }
    if (validateSecond((index + boardsize * 2 + 2), boardsize)) {
      result.push(index + boardsize * 2 + 2);
    }
    if (validateSecond((index + boardsize * 2 - 2), boardsize)) {
      result.push(index + boardsize * 2 - 2);
    }
    if (validateSecond((index - boardsize * 2 + 2), boardsize)) {
      result.push(index - boardsize * 2 + 2);
    }
    if (validateSecond((index - boardsize * 2 - 2), boardsize)) {
      result.push(index - boardsize * 2 - 2);
    }
    if (char === 'swordsman' || char === 'undead') {
      const validateThird = (value, boardSize) => {
        if (value < boardSize * boardSize && value >= 0) {
          // Левый край
          if (index % boardsize === 0 && (value + 3) % boardsize === 0) {
            return false;
          }
          // Правый край
          if ((index + 1) % boardsize === 0 && (value - 2) % boardsize === 0) {
            return false;
          }
          // Предлевый край
          if ((index - 1) % boardsize === 0 && (value + 2) % boardsize === 0) {
            return false;
          }
          // Предправый край
          if ((index + 2) % boardsize === 0 && (value - 1) % boardsize === 0) {
            return false;
          }
          // Предпредлевый край
          if ((index - 2) % boardsize === 0 && (value + 1) % boardsize === 0) {
            return false;
          }
          // Предпредправый край
          if ((index + 3) % boardsize === 0 && value % boardsize === 0) {
            return false;
          }
          return true;
        }
        return false;
      };
      if (validateThird((index + 3), boardsize)) {
        result.push(index + 3);
      }
      if (validateThird((index - 3), boardsize)) {
        result.push(index - 3);
      }
      if (validateThird((index + boardsize * 3), boardsize)) {
        result.push(index + boardsize * 3);
      }
      if (validateThird((index - boardsize * 3), boardsize)) {
        result.push(index - boardsize * 3);
      }
      if (validateThird((index + boardsize * 3 + 3), boardsize)) {
        result.push(index + boardsize * 3 + 3);
      }
      if (validateThird((index + boardsize * 3 - 3), boardsize)) {
        result.push(index + boardsize * 3 - 3);
      }
      if (validateThird((index - boardsize * 3 + 3), boardsize)) {
        result.push(index - boardsize * 3 + 3);
      }
      if (validateThird((index - boardsize * 3 - 3), boardsize)) {
        result.push(index - boardsize * 3 - 3);
      }
    }
  }
  return result;
};

export default possibleMoves;
