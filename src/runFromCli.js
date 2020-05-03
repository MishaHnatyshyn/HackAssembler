import {compileHackAssemblyToBinary} from "./compiler.js";

export const runFromCli = () => {
  const [,,targetFileFromCommandLine] = process.argv;
  if (!targetFileFromCommandLine) {
    throw Error('Please specify .asm filename as first argument! Example: node runFromCli.js <filename>.asm');
  }
  compileHackAssemblyToBinary(targetFileFromCommandLine);
}

runFromCli();


