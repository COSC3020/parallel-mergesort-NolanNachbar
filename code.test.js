const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}

async function test() {
  let arr;

  arr = [];
  await new Promise((resolve) => mergesort(arr, resolve));
  assert(arraysEqual(arr, []), `Expected [] but got ${arr}`);

  arr = [1, 2, 1];
  await new Promise((resolve) => mergesort(arr, resolve));
  assert(arraysEqual(arr, [1, 1, 2]), `Expected [1, 1, 2] but got ${arr}`);
  
  arr = [1, 2, 3, 1, 6, 7, 1];
  await new Promise((resolve) => mergesort(arr, resolve));
  assert(arraysEqual(arr, [1, 1, 1, 2, 3, 6, 7]), `Expected [1, 1, 1, 2, 3, 6, 7] but got ${arr}`);
}

test()
