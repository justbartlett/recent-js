var str="Hello";
str.padStart(5); //=> "Hello"
str.padStart(8); //=> "   Hello"
str.padStart(8, "*") //=> "***Hello"
str.padStart(8, "12345") //=> "123Hello"
str.padStart(8, "ab") //=> "abaHello"

// your not telling what length you want to pad, your telling what length you want to pad TO!

var str="Hello";
str.padEnd(5); //=> "Hello"
str.padEnd(8); //=> "Hello   "
str.padEnd(8, "*") //=> "Hello***"
str.padEnd(8, "12345") //=> "Hello123"
str.padEnd(8, "ab") //=> "Helloaba"

var str = "   some stuff   \t\t";
str.trim(); //=> "some stuff"
str.trimStart(); //=> "some stuff       "
str.trimEnd(); //=> "   some stuff"