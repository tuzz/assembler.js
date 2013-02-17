## assembler.js

A JavaScript assembler for the [Hack assembly language](http://www.nand2tetris.org/06.php).

I built this assembler for Chapter 6 of [Building a Modern Computer from First Principles](http://www.amazon.com/Elements-Computing-Systems-Building-Principles/dp/0262640686/).

I chose to use JavaScript because it seemed unorthodox and I was keen to learn some design patterns.

## Setup

```
brew install v8
```

## Usage

```
d8 lib/assembler.js -- file.asm > file.hack
```

## Specs

The test-suite is built with [qunit](http://qunitjs.com). Open ```spec/run.html``` to run the specs.
