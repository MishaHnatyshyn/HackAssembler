# Assembler for HACK Computer
This assembler is part of online course [Build a Modern Computer from First Principles: From Nand to Tetris](https://www.coursera.org/learn/build-a-computer) on Coursera.

This program will convert *.asm files with HACK assembly code to *.hack files with binary instructions suitable for the 16-bit HACK computer.
### Requirements
node >= 14.0.0

### Usage for single file via command line
run `node runFromCli.js <filename>.asm` or `npm start <filename>.asm`

### Usage for multiple files
Put your .asm files in `asmFiles/` directory

run `node src/testRunner.js` or `npm run start:test-runner`

