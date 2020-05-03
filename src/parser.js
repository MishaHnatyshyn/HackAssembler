import {
  DESTINATION_BITS_MAP,
  EXPRESSION_BITS_MAP,
  JUMP_BITS_MAP,
  BUILT_IN_SYMBOLS
} from './constants.js';

let SYMBOL_TABLE;
let lastFreeMemIndex;

const removeCommentsAndEmptyString = (file) => file
  .filter((line) => (
    !line.trim().startsWith('//') && line.length > 0 && line !== '\r'
  ))
  .map((line) => {
    const lineWithoutSlashR = line.replace('\r', '').trim();
    if (lineWithoutSlashR.includes('//')) {
      const commentStartIndex = lineWithoutSlashR.indexOf('//');
      return lineWithoutSlashR.substr(0, commentStartIndex).trim();
    }
    return lineWithoutSlashR;
  })


const parseAInstruction = (instruction) => {
  const number = instruction.substr(1);
  const parsedNumber = parseInt(number);
  let numberInDecimal;

  if (isNaN(parsedNumber)) {
    if (number in SYMBOL_TABLE) {
      numberInDecimal = SYMBOL_TABLE[number];
    } else {
      SYMBOL_TABLE[number] = lastFreeMemIndex;
      numberInDecimal = lastFreeMemIndex;
      lastFreeMemIndex++;
    }
  } else {
    numberInDecimal = parsedNumber;
  }

  const numberInBinary = numberInDecimal
    .toString(2)
    .padStart(15, '0');

  return `0${numberInBinary}`;
}

const parseCInstruction = (instruction) => {
  const [dest, expWithJump] = instruction.includes('=') ? instruction.split('=') : ['NULL', instruction];
  const [exp, jumpCode = 'NULL'] = expWithJump.split(';');
  const jumpBits = JUMP_BITS_MAP[jumpCode];
  const destBits = DESTINATION_BITS_MAP[dest];
  const commandBits = EXPRESSION_BITS_MAP[exp];
  const a = exp.includes('M') ? 1 : 0;
  return `111${a}${commandBits}${destBits}${jumpBits}`
}

const parseLineOfCode = (line) => {
  if (line.startsWith('@')) {
    return parseAInstruction(line);
  } else {
    return parseCInstruction(line);
  }
}

const parseFinalCode = (code) => code.map(parseLineOfCode);

const processLabels = (code) => {
  let labelsCount = 0;

  return code.filter((command, index) => {
    if (command.startsWith('(')) {
      const label = command.substr(1, command.length - 2);
      SYMBOL_TABLE[label] = index - labelsCount;
      labelsCount++;
      return false;
    }
    return true;
  })
}

export const convertCodeToBinary = program => {
  SYMBOL_TABLE = { ...BUILT_IN_SYMBOLS };
  lastFreeMemIndex = 16;
  const clearProgram = removeCommentsAndEmptyString(program);
  const programWithoutLabels = processLabels(clearProgram);
  return parseFinalCode(programWithoutLabels);
}
