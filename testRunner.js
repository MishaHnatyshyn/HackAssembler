import fs from 'fs';
import path from 'path';
import { compileHackAssemblyToBinary } from './compiler.js';
const TEST_FILES_DIR = 'asmFiles'

const files = fs.readdirSync(TEST_FILES_DIR);

files
  .filter((file) => file.includes('.asm'))
  .forEach((file) => compileHackAssemblyToBinary(path.join(TEST_FILES_DIR, file)));

