ASSEMBLER.Parser = function () {
  var input = ASSEMBLER.io.read();
  var lines = input.split("\n");

  var index = -1;
  var line;

  var aMatcher = /@(.*)/;
  var lMatcher = /\((.*?)\)/;

  var cInstruction = function () {
    var fragments = line.split(/=|;/);
    var dest, comp, jump;

    if (line.indexOf("=") >= 0) {
      dest = fragments[0];
      comp = fragments[1];
      jump = fragments[2];
    }
    else {
      comp = fragments[0];
      jump = fragments[1];
    }

    return {
      dest: dest || "null",
      comp: comp,
      jump: jump || "null"
    };
  };

  this.hasMoreCommands = function () {
    return (line || index < 0);
  };

  this.advance = function () {
    index++;
    line = lines[index];
  };

  this.commandType = function () {
    if (aMatcher.test(line)) {
      return "A_COMMAND";
    }
    else if (lMatcher.test(line)) {
      return "L_COMMAND";
    }
    else {
      return "C_COMMAND";
    }
  };

  this.symbol = function () {
    var aCapture = aMatcher.exec(line);
    var lCapture = lMatcher.exec(line);

    if (aCapture) {
      return aCapture[1];
    }
    else {
      return lCapture[1];
    }
  };

  this.dest = function () {
    return cInstruction().dest;
  };

  this.comp = function () {
    return cInstruction().comp;
  };

  this.jump = function () {
    return cInstruction().jump;
  };
};
