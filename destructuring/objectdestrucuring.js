//object destructuring
function data() {
  return {a:1, b:2, c:3, d:4, e:7}
}

var tmp = data();
var first = tmp.a !== undefined ? tmp.a : 42;
var second = tmp.b;
var third = tmp.c;

//

var {
  b: second, // order doesnt matter with object
  a: first = 42, // source: target = default
  c: third,
  ...fourth // this is a whole seperate object containing d and e
} = data();

/////////
// object literal
var o = {
  prop: value,
  target: source
};
var {
  prop: value,
  source: target
} = o;

//////////////////////

function data() {
  return {a:1, b:2, c:3, d:4, e:7}
}

var tmp = data();
var first, second;

first = tmp.a;
second = tmp.b;

//
var first, second;
({   // destructuring pattern with no declarator put a parenthesis around all of it
  b: second,
  a: first
} = data());

// or we could do
var first, second;
var tmp;
tmp = {
  b: second,
  a: first
} = data();

///////////////////////////

function data() {
  // return {b:2, c:3, d:4}
}
var tmp = data() || {};
var a = tmp.a;
var b = tmp.b;
//
var first, second;
// var {
//   b: b, // if the source and the target are the same name you only have to list it once ==> b
//   a: a // a
// } = data() || {}; // provide the empty object as a fallback
// this becomes
var {
  a,
  b
} = data() || {};

////////////////
// subobject
function data() {
  return {
    a: 1,
    b: {
      c: 3,
      d: 4
    }
  };
}
var tmp = data() || {};
var a = tmp.a;
var b = tmp.b || {};
var c = b.c;
var d = b.d;
// 
var {
  a,
  b: {
    c,
    d
  } = {}
} = data() || {};
//////////////
// default assignment
var o1 = {
  a: {
    b: 2,
    c:3
  }
};
var o2 = {
  a:{}
}
var o3 = {};

var {
  a: {
    b = 10,
    c = 20
  } = {} 
} = o1;

/// destructuring object parameters
function data(tmp = {}) {
  var {
    a,
    b
  } = tmp;
}
// better equivalent is do destructuring in the parameter position if you only care about pulling out its contents
function data({
  a,
  b
} = {}, x) {
  // ..
}
data({a: 1, b:2}, 42)

///////////
function data () {
  return  {
    a: 1,
    b: {
      c: 3,
      d: 4
    }
  }
}
var tmp = data() || {};
var a = tmp.a;
var b = tmp.b || {};
var c = c.c;
var d = b.d;
//
var {
  a,
  b: {
    c,
    d
  } = {}
} = data() || {};

////////
// we can have object inside of array pattern and array pattern inside of object pattern
var obj = {
  a: 1,
  b: {
    x: 2
  },
  c: 3,
  d: [500,5000]
}
var {
  a,
  b,
  b: {
    x: W
  },
  c,
  d:  [
    Y, // 500
    Z // 5000
  ]
} = obj;

// destructing and restructuring - instead of lodash extends and using a default settings and overriding
function ajaxOptions({
  url = "http://some.base.url/api",
  method = "post",
  data,
  callback,
  headers: [
    headers0 = "Content-Type: text/plain",
    ...otherHeaders
  ] = []
} = {}) {
  return {
    url, method, data, callback,
    headers: [
      headers0,
      ...otherHeaders
    ]
  };
}

var defaults = ajaxOptions();
console.log(defaults);

var settings = {
  url: "http://some.other.url/",
  data: 42,
  callback: function(resp) { /* .. */ }
};
// with an agrument, mixes in the settings w/ the defaults
ajax(ajaxOptions(settings));
