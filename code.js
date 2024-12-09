const async = require('async');

function msort(x, lo, hi, tmp, callback) {
  if (lo >= hi) {
    callback();
    return;
  }

  var mid = Math.floor((lo + hi) / 2);

  async.parallel(
    [
      (done) => msort(x, lo, mid, tmp, done), // left half
      (done) => msort(x, mid + 1, hi, tmp, done), // right half
    ],
      () => {
      merge(x, lo, mid, hi, tmp);
      callback();
    }
  );
}

function mergesort(x, callback) {
  const tmp = [];
  msort(x, 0, x.length - 1, tmp, callback);
}

function merge(x, lo, mid, hi, tmp) {
  let a = lo, b = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (a <= mid && (b > hi || x[a] <= x[b])) {
      tmp[k] = x[a++];
    } else {
      tmp[k] = x[b++];
    }
  }
  for (let k = lo; k <= hi; k++) {
    x[k] = tmp[k];
  }
}
