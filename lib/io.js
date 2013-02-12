IO = {};

IO.argv = arguments;

IO.read = function () {
  if (IO.argv.length !== 1) {
    print("Usage: d8 assembler.js -- file.asm");
    quit(1);
  }

  try {
    return read(IO.argv[0]);
  }
  catch(error) {
    print(IO.argv[0] + ": No such file or directory");
    quit(1);
  }
};

IO.write = function (content) {
  var filename = IO._basename() + ".hack";
  var command = "echo '" + content + "' > " + filename;

  os.system("sh", ["-c", command]);
};

IO._basename = function () {
  return IO.argv[0].replace(/.*\/|\.[^.]*$/g, "");
};
