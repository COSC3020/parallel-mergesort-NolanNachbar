# Parallel Mergesort

Implement a parallel version of mergesort (both the original recursive and the
iterative in-place version from a previous exercise are fine). You may use any
parallelization framework or method.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the span of the parallel program, in terms of worst-case $\Theta$? Hint:
It may help to consider the DAG of the parallel program.

First, consider my code:
```js
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
```

Recall that for vanilla mergesort, the time complexity is $\Theta (n \log n)$. This is because you are breaking the array into $\log n$ sizes of subarrays and going through the array $n$ at each of those array sizes. Hence, you multiple and get $\Theta (n \log n)$. 

My implementation processes every subarray of size $k$ in parallel (provided capability for the parallel processes), so with this implementation, the span is $\log n$. Because of the merging process which is $\Theta(n)$ at $\log n$ levels, the time complexity is still $\Theta (n \log n)$. 


I started off by copying the recursive mergesort code from the slides and then using the async library to implement parallelism.  


I used this to figure out how to use the parallel pat of the async library: 
https://medium.com/@jomote/a-comprehensive-guide-to-using-async-parallel-in-node-js-df51b1bf81a4


I used these for general syntax and concepts relating to async parallelism:

https://caolan.github.io/async/v3/docs.html#parallel

https://stackoverflow.com/questions/20186081/understanding-node-js-async-parallel

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
