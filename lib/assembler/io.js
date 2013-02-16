ASSEMBLER.io = {};

ASSEMBLER.io.argv = arguments;

ASSEMBLER.io.read = function () {
  if (ASSEMBLER.io.argv.length !== 1) {
    print("Usage: d8 assembler.js -- file.asm");
    quit(1);
  }

  try {
    return read(ASSEMBLER.io.argv[0]);
  }
  catch(error) {
    print(ASSEMBLER.io.argv[0] + ": No such file or directory");
    quit(1);
  }
};

ASSEMBLER.io.write = function (content) {
  var basename = ASSEMBLER.io.argv[0].replace(/.*\/|\.[^.]*$/g, "");
  var filename = basename + ".hack";
  var command = "echo '" + content + "' > " + filename;

  os.system("sh", ["-c", command]);
};
