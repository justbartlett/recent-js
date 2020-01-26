// async functions
// promise chains yuck
fetchCurrentUser()
  .then(function onUser(user){
    return Promise.all([
      fetchArchivedOrders(user.id),
      fetchCurrentOrders(user.id)
    ]);
  })
  .then(function OnOrders(
    [archivedOrders, currentOrders]
  ) {
    //.. 
  })

// sync-async (with generators)
// another way of thinking about what a generator can do is that because there is an iterator protocal attached to it
// it can pause itself by virtue of the yield keyword
runner(function *main() { // runner allows user to pause, its a promise utility library utility like co, koa, or bluebird, they all have a utility on them which
  //is able to run generators as if they're async/sync tradeoff pattern
  // which means if you yield out a promise it will wait for it to resolve before resuming your generator and give you the value back
  var user = yield fetchCurrentUser(); // fetch the current users and yield out the result of that which is a promise and wait for that to come back
  var [ archivedOrders, currentOrders ] = 
    yield Promise.all([
      fetchArchivedOrders( user.id ),
      fetchCurrentOrders( user.id )
    ]);
  // ..
});

// can you give me syntactic support for that pausing and resuming thing without needing to use a library runner? --> async await
async function main() {
  var user = await fetchCurrentUser();
  var [ archivedOrders, currentOrders ] =
    await Promise.all([
      fetchArchivedOrders(user.id),
      fetchCurrentOrders(user.id)
    ]);
  // .. 
}
main();

// async iteration
// async fp iterations
async function fetchFiles(files) {
  var prs = files.map(getFile);
  prs.forEach(function each(pr) {
    console.log(await pr); // this fails because await needs to be used within an async function
  });
}

// fasy: better async fp iterations - github.com/getify/fasy
async function fetchFiles(files) {
  var prs = await fakeAjax.concurrent.map(getFile, files);
  await FA.serial.forEach(async function each(pr) {
    console.log(await pr);
  }, prs);
}

// async functions: problems
// await only knows what to do with thenables and promises
// scheduling (starvation) - infinite microtask loop
// external cancelation - can't tell it to stop

// async generators with yield
// es2018 yield for pushing await for pulling

// async all at once
async function fetchURLs(urls) {
  var results = [];
  for (let url of urls) {
    let resp = await fetch(url);
    if (resp.status == 200) {
      let text = await resp.text();
      results.push(text.toUpperCase());
    }
    else {
      results.push(undefined);
    }
  }
  return results;
}

// overloaded yield - yield is pulling and pushing
function *fetchURLs(urls) {
  for(let url of urls) {
    let resp = yield fetch(url);
    if(resp.status == 200) {
      let text = yield resp.text();
      yield text.toUpperCase();
    }
    else {
      yield undefined;
    }
  }
}

// async generators
async function *fetchURLs(urls) {
  for(let url of urls) {
    let resp = await fetch(url);
    if(resp.status == 200) {
      let text = await resp.text();
      yield text.toUpperCase();
    }
    else {
      yield undefined;
    }
  }
}

// async generators upfront
async function *fetchURLs(urls) {
  var prs = urls.map(fetch);
  for(let pr of prs) {
    let resp = await pr;
    if(resp.status == 200) {
      let text = await resp.text();
      yield text.toUpperCase();
    } else {
      yield undefined;
    }
  }
}

// async iteration: busted
// this ain't gonna work, we're going to get back a promise for the iterator result
for (let text of fetchURLs(favoriteSites)) {
  console.log(text);
}

// this wont work
var it = fetchURLs(favoriteSites);
while(true) {
  let res = it.next();
  if(res.done) break;
  let text = res.value;
  console.log(text);
}

// async iteration
// instead 
async function main(favoriteSites) {
  while(true){
    let res = await it.next();
    if(res.done) break;
    let text = res.value;
    console.log(text);
  }
}

async function main(favoriteSites) {
  for await (let text of fetchURLs(favoriteSites)) {
    console.log(text);
  }
}