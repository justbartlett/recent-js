function upper(strings,...values) {
	var str = "";
	for (let i=0; i<strings.length; i++) {
		if (i > 0) {			/// we already have strings of 0 so we are on values of 1 so we use i-1
			str += String(values[i-1]).toUpperCase();  /// strings as an array has one more value than values array
		}
		str += strings[i]
	}
	return str;
}

var name = "kyle",
	twitter = "getify",
	topic = "JS Recent Parts";

console.log(
	upper `Hello ${name} (@${twitter}), welcome to ${topic}!` ===
	"Hello KYLE (@GETIFY), welcome to JS RECENT PARTS!"
);
