// iterators
// iterator pattern is a common way to consume values in a data source like an array one value at a time
// essentially you construct a controller that gives you a view of that data source
// and presents values one value at a time
// you do that by constructing an object and calling .next over and over and every time you
// call .next you get back the next value from that data source

var str = "Hello";
var world = ["W", "o", "r", "l", "d"];

var it1 = str[Symbol.iterator](); // constructing an iterator
// calling this Symbol.iterator which is a special value that finds a location 
// on the string object and produces an iterator from it
// were accessing the special meta location on the object and then invoking it as a function
// and that give my iterator instance it1
var it2 = world[Symbol.iterator]();

it1.next() // {value: "H", done: false} - referred to as an iterator result
it1.next() // {value: "e", done: false}
it1.next() // {value: "l", done: false}
it1.next() // {value: "l", done: false}
it1.next() // {value: "o", done: false}
it1.next() // {value: undefined, done: true}

it2.next() // {value: "W", done: false}
// ..

// declarative iterators
// if you wanted to loop over a string programmatically in a looping construct instead of calling .next .next .next
// you could come up with a looping construct like this:
// iterators: imperative syntax iteration
var str = "Hello";
for(
  let it = str[Symbol.iterator](), v, result;
  (result = it.next()) && !result.done && (v = result.value || true);
) {
  console.log(v);
}
// "H", "e", "l", "l", "o"

// iterators: declarative iteration
// in es6 we have for of loop
// distinct from for in and regular numeric iterator loop
var str = "Hello";
var it = str[Symbol.iterator]();
for (let v of it) {
  console.log(v);
}
// "H", "e", "l", "l", "o"
for(let v of str) {
  console.log(v);
}
// "H", "e", "l", "l", "o"
// you can use for of on strings, arrays, sets, maps, typed arrays - all of these are iterables
// you can also use another syntax for iterating over them with is the ... operator
var str="Hello";
var letters = [...str];
letters; // ["H", "e", "l", "l", "o"]
// spread ... operator consumes and iterator - string being an iterator and I'm spreading it out
// slash iterating it out into the enclosing array


// object does not have built in iterator
var obj = {
  a: 1,
  b: 2,
  c: 3
}
for (let v of obj) {
  console.log(v);
}
// TypeError!

// iterators: imperative iterator
var obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function() {
    // getting a list of keys from my object
    var keys = Object.keys(this); // The Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would. // expected output: Array ["a", "b", "c"]
    var index = 0;
    // returning back an object
    return {
      next: () =>  // one property on it called next
        (index < keys.length) ? // check to see if theres any more to iterate over
          { done: false, value: this[keys[index++]]} :
          { done: true, value: undefined }
    }
  }
};
[...obj];
[1,2,3]

// iterators: generators
// when you invoke a generator function it doesnt run it produces an iterator
function *main() { // * indicates we are dealing with a special kind of function called a generator
  yield 1;
  yield 2;
  yield 3;
  return 4;
}
var it = main();
it.next();  // { value: 1, done: false }
it.next();  // { value: 2, done: false }
it.next();  // { value: 3, done: false }
it.next();  // { value: 4, done: true }
[...main()];
// [1,2,3] // as soon as it sees a done true it stops - hence 4 doesn't show up
// make sure you always yield values dont return them

// iterators: declarative iterator
var obj = {
  a: 1,
  b: 2,
  c: 3,
  *[Symbol.iterator]() { // * indicates this function is going to be that generator type
    for (let key of Object.keys(this)) { // iterate over all the keys (keys, values, entries)
      // for of works bc object.keys returns an array and arrays are iterables
      yield this[key]; // yield out this of key which would be the value
    }
  }
};
[...obj];
// [1,2,3]
