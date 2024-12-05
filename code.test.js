const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

async function test() {
  let key = 1; 
  
  arr = [];
  assert(await msort(arr, key) === []);

  
  arr = [1, 2, 1];
  assert(await msort(arr, key) === [1, 1, 2]);
  
  
  arr = [1, 2, 3, 1, 6, 7, 1];
  assert(await msort(arr, key) === [1, 1, 1, 6, 2, 3, 7 ]);
}
test();
