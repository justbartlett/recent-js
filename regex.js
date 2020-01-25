// regex
// assertions, look ahead 
// look ahead - essentially when I match a thing I wanna lookahead and say my match only happens if something
// immediately after this matches this

var msg = "Hello World";

msg.match(/(l.)/g);   // ["ll, ld"]
msg.match(/(l.)$/g);  // ["ld"]   // l., $ = end of string
msg.match(/(l.)(?=o)/g);  // ["ll"]   //  (?=o) positive lookahead - ensure that this pattern does match
msg.match(/(l.)(?!o)/g);  // ["lo", "ld"]   // (?!o) negative lookahead - only when not followed by an 'o'
msg.match(/(?<=e)(l.)/g); // ["ll"]   // look behind - only match an l. if its preceded by an e
msg.match(/(?<!e)(l.)/g); // ["lo", "ld"]   // negative look behind - only match an l. if its not preceded by an e

// named capture groups
msg.match(/.(l.)/);   // ["ell", "ll"]
msg.match(/([jkl])o Wor\1/);  // ["lo Worl", "l"]
msg.match(/(?<cap>l.)/).groups; // {cap: "ll"}
msg.match(/(?<cap>[jkl])o Wor\k<cap>/); // ["lo Worl", "l"]
msg.replace(/(?<cap>l.)/g,"-$<cap>-");  // "He-ll-o Wor-ld-"
msg.replace(/(?<cap>l.)/g, function re(...args) {
  var [,,,,{ cap }] = args;
  return cap.toUpperCase();
});
// "HeLLo WorLD"

// dotall mode - /s - match across new lines
var msg = `
The quick brown fox
jumps over the
lazy dog`;

msg.match(/brown.*over/);   // null
msg.match(/brown.*over/s);  // ["brown fox\njumps over"]

// /u turns on unicode aware mode
