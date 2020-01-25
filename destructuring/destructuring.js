// destructuring - decomposing a structure into its individual parts
// assign individual parts from a larger structure

var tmp = getSomeRecords();

var first = tmp[0];
var second = tmp[1];

var fistName = first.name;
var firstEmail = first.email !== undefined ? first.email : "nobody@none.tld";

var secondName = second.name;
var secondEmail = second.email !== undefined ? second.email : "nobody@none.tld";

// this can be done with
// because this is on the left hand side of the equals this isn't a value at all, this is not an array of objects
// its actually a pattern. its a syntax that is describing the value that is expected
// from the right hand side, which is where we call the getsomerecords api.
// purpose for decscribing it is so that we can assign those individual values off as we need them
var [
  {
    // there is going to be a name property 
    // : firstName is essentially saying, go make me a variable called firstName 
    // that has the value that is in this particular location of the data structure
    // which is the name property of the first object in an array
    name: firstName,
    email: firstEmail = "nobody@none.tld" // if there's not an email property present use this backup default value
  },
  {
    name: secondName,
    email: secondEmail = "nobody@none.tld" // default only checks strict equality check with undefined (null would overwrite the email we provided as the default value)
  }
] = getSomeRecords();



function data() {
  return [1,2,3,4,5]
}
var tmp = data();
var first = tmp[0];
var second = tmp[1];
var third = tmp[2];
var fourth = tmp.slice(3); // fourth = [4,5] // if theres nothing in that position we can an empty array

// destructured
function data() {
  return [1,2,3,4,5]
}
var [
  first,
  second,
  third,
  ...fourth // gather everything else up in an array called fourth // if theres nothing in that position we can expect an empty array
  // gather (...) must be at the end of the pattern
] = data();

var tmp;
var [
  first,
  second,
  third,
  ...fourth
] = tmp = data();

/////////////////////////////

function data() {
  return[1,2,3]
}
var tmp = data();
var first, second, third, fourth;
first = tmp[0];
second = tmp[1];
third = tmp[2];
fourth = tmp.slice(3);

// destructuring is about the assingments. not the declarations
var tmp;
var first, second, third, fourth;
[
  first,
  second,
  third,
  ...fourth
] = tmp = data();


/////////////////////////////

function data() {
  return[1,2,3]
}
var tmp = data();
var o = {};
o.first = tmp[0];
o.second = tmp[1];
o.third = tmp[2];
o.fourth = tmp.slice(3);

var tmp;
var o ={};
[
  o.first,
  o.second,
  o.third,
  ...o.fourth
] = tmp = data();

/////////////////////////////

function data() {
  return[1,2,3]
}
var tmp = data();
var o = [];
o[3] = tmp[0];
o[10] = tmp[1];
o[42] = tmp[2];
o[100] = tmp.slice(3);

var tmp = data();
var o = [];
[
  o[3],
  o[10],
  o[42],
  ...o[100]
] = tmp;

/////////////////////////////

function data() {
  return[1,2,3]
}
var tmp = data();
var o = [];
o[3] = tmp[0];
o[10] = tmp[1];
o[42] = tmp[2];
o[100] = tmp.slice(3);

var tmp;
var o = [];
tmp = [ // an assignment expression result is the entire array regardless of how much or little of it was assigned
  // so tmp points to the whole array
  o[42],
  ...o[100]
] = data();

////////////////////////// 

function data() {
  return [1,2,3]
}

var tmp = data();
var first = tmp[0];
// var second = tmp[1];
var third = tmp[2];
var fourth = tmp.slice(3);
// 
var tmp;
var [
  first,
  , // this an empty assignment, called array ellision
  third,
  ...fourth
] = temp = data();

///////////////
// swapping
var x = 10;
var y = 20;
{
  let tmp = x;
  x = y;
  y = tmp;
}
//
[y,x] = [x,y];

//////////////////
function data(tmp = []) { // default parameter value so it doesnt fail
  var [
    first,
    second,
    third
  ] = tmp;
}
// we can do destructuring in a parameter position
function data([
  first = 10, // 10,20,30 are providing default values
  second = 20,
  third = 30
] = []) { // =[] is our default parameter value so it doesnt fail
  // ..
}


/////////////////////

function data() {
  return null;
}

var tmp = data() || []; // fallback now tmp[0] will return undefined and not fail
var first = tmp[0]; //=> type error, position 0 on a null value
var second = tmp[1];
var third = tmp[2];
var fourth = tmp.slice(3);
// 
var tmp;
var [
  first,
  second,
  third,
  ...fourth
] = temp = data() || [];

////////////////////////// 

function data() {
  // return [1,[2,3],4]
  return [1,undefined,4]
}

var tmp = data() || [];
var first = tmp[0];
var tmp2 = tmp[1] || [];
var second = tmp2[0];
var third = tmp2[1];
var fourth = tmp[2];
// 
var tmp;
var [
  first,
  [
    second,
    third
  ] = [], // graceful fallback
  fourth
] = temp = data() || [];