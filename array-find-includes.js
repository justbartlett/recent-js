// array.find() and array.findIndex()

var arr = [{a:1}, {a:2}];
arr.find(function match(v) {
  return v && v.a > 1;
});
// {a:2}

arr.find(function match(v) {
  return v && v.a > 10;
});
// undefined

arr.findIndex(function match(v) {
  return v && v.a > 10;
})
// -1 

var arr = [10,20,NaN, 30, 40, 50];
arr.includes(20) // true
arr.includes(60) // false
arr.includes(20,3) // false
arr.includes(10, -2) // false
arr.includes(40, -2) // true (two from the end)
arr.includes(NaN) // true

