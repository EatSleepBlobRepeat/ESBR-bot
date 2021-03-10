module.exports = (arg) => {
  const returnDict = {
    day: null,
    limit: null,
    by: null,
  };
  /** @type {Array} */
  const splitArg = arg;
  const lenOfargs = splitArg.length;
  const checkIfDigit = (str) => (!Number.isNaN(str) && !Number.isNaN(parseInt(str, 10)));
  const returnDigit = (str) => {
    if (checkIfDigit(str)) {
      return parseInt(str, 10);
    }
    throw Error('Invalid day value');
  };
  const checkIfLimit = (first, second) => {
    if (first === 'limit' && checkIfDigit(second)) {
      return parseInt(second, 10);
    }
    throw Error('Invalid limit value');
  };
  const checkIfBy = (first, second) => {
    if (first === 'by') {
      return second;
    }
    throw Error('Invalid arguments');
  };
  const checkIflimitORby = (first, second) => {
    let numExecptions = 0;
    const byLimitRet = {
      by: null,
      limit: null,
    };
    try {
      byLimitRet.by = checkIfBy(first, second);
    } catch (e) {
      numExecptions += 1;
    }
    try {
      byLimitRet.limit = checkIfLimit(first, second);
    } catch (e) {
      numExecptions += 1;
    }
    if (numExecptions !== 1) {
      throw Error('Invalid arguments');
    }
    return byLimitRet;
  };
  const checkIflimitAndby = (first, second, third, fourth) => {
    const tempFirstByLimit = checkIflimitORby(first, second);
    const tempSecondByLimit = checkIflimitORby(third, fourth);

    if ((tempFirstByLimit.by === null && tempSecondByLimit.by === null)
      || (tempFirstByLimit.limit === null && tempSecondByLimit.limit === null)) {
      throw Error('Invalid arguments');
    } else {
      const newDict = {};
      if (tempSecondByLimit.by === null) {
        newDict.by = tempFirstByLimit.by;
      } else {
        newDict.by = tempSecondByLimit.by;
      }
      if (tempSecondByLimit.limit === null) {
        newDict.limit = tempFirstByLimit.limit;
      } else {
        newDict.limit = tempSecondByLimit.limit;
      }
      return newDict;
    }
  };
  let tempVals;
  switch (lenOfargs) {
    case 1:
      returnDict.day = returnDigit(splitArg[0]);
      break;
    case 3:
      returnDict.day = returnDigit(splitArg[0]);
      // 2 and 3 needs to be by or and string
      // or 2 and 3 needs to be limit and int
      tempVals = checkIflimitORby(splitArg[1], splitArg[2]);
      returnDict.by = tempVals.by;
      returnDict.limit = tempVals.limit;
      break;
    case 5:
      // 1 needs to be int
      returnDict.day = returnDigit(splitArg[0]);
      // 2 needs to be either by or limit
      tempVals = checkIflimitAndby(splitArg[1], splitArg[2], splitArg[3], splitArg[4]);
      returnDict.by = tempVals.by;
      returnDict.limit = tempVals.limit;
      break;
    default:
      throw Error('Invalid arguments');
  }
  return returnDict;
};
