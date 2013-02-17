test("it assembles the given example correctly", function () {
  var asm = "                                   \
                                                \
             // Adds 1 + ... + 100            \n\
               @i                             \n\
               M=1    // i=1                  \n\
               @sum                           \n\
               M=0    // sum=0                \n\
             (LOOP) @i                        \n\
               D=M    // D=i                  \n\
               @100                           \n\
               D=D-A  // D=i-100              \n\
               @END                           \n\
               D;JGT  // if (i-100)>0 goto END\n\
               @i                             \n\
               D=M    // D=i                  \n\
               @sum                           \n\
               M=D+M  // sum=sum+i            \n\
               @i                             \n\
               M=M+1  // i=i+1                \n\
               @LOOP                          \n\
               0;JMP  // goto LOOP            \n\
             (END)                            \n\
               @END                           \n\
               0;JMP  // infinite loop        \n\
                                                \
                                                \
  ";



  var hack = "                         \
                                       \
                     0000000000010000\n\
                     1110111111001000\n\
                     0000000000010001\n\
                     1110101010001000\n\
                     0000000000010000\n\
                     1111110000010000\n\
                     0000000001100100\n\
                     1110010011010000\n\
                     0000000000010010\n\
                     1110001100000001\n\
                     0000000000010000\n\
                     1111110000010000\n\
                     0000000000010001\n\
                     1111000010001000\n\
                     0000000000010000\n\
                     1111110111001000\n\
                     0000000000000100\n\
                     1110101010000111\n\
                     0000000000010010\n\
                     1110101010000111\n\
                                       \
                                       \
  ".trim().replace(/ +/g, "");

  setInput(asm);
  bindOutput(function (output) {
    equal(output, hack);
  });

  ASSEMBLER.assemble();
});
