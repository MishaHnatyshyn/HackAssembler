import fs from 'fs';

export const writeInHackFile = (inputFile, code) => {
  const binaryProgramText = code.join('\n');

  const resultFileName = inputFile.replace('.asm', '.hack');

  fs.writeFileSync(resultFileName, binaryProgramText);
}

export const readAsmFile = (file) => {
  return fs
    .readFileSync(file)
    .toString('utf-8')
    .split('\n');
}
