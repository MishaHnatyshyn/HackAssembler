import {compileHackAssemblyToBinary} from "./compiler.js";

export const runFromCli = () => {
  const [,,targetFileFromCommandLine] = process.argv;
  if (!targetFileFromCommandLine) {
    throw Error('Please specify .asm filename as first argument! Example: node runFromCli.js <FILENAME.asm>');
  }
  compileHackAssemblyToBinary(targetFileFromCommandLine);
}

runFromCli();


