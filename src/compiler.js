import { readAsmFile, writeInHackFile } from './fileProcessor.js';
import { convertCodeToBinary } from './parser.js';

export const compileHackAssemblyToBinary = (targetFile) => {
  const file = readAsmFile(targetFile);
  const program = convertCodeToBinary(file);
  writeInHackFile(targetFile, program);
}
