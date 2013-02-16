// Replicate V8's load function.
var load = function (path) {
  document.write("<script src='" + path + "'></script>");
};

// Provide a straightforward mechanism to stub input.
var setInput = function (input) {
  ASSEMBLER.io.read = function () {
    return input;
  };
};

load("lib/assembler.js");
