// We use Node's built-in "fs" module so we can read input from standard input (stdin).
// In competitive programming, input is usually provided through stdin, either by the judge
// or by redirecting a file into the program.
const fs = require("fs");

// Read everything from stdin as one big string.
// `0` means standard input.
// `utf8` tells Node to treat the input as normal text.
const rawInput = fs.readFileSync(0, "utf8");

// Remove extra whitespace at the start and end, then split on ANY whitespace.
// This means it works whether numbers are separated by spaces or newlines.
// Finally, convert every token to a Number.
//
// Example:
// Input text:
//   5 3
//   3 5 7 9 12
// becomes an array like:
//   [5, 3, 3, 5, 7, 9, 12, ...]
const input = rawInput.trim().split(/\s+/).map(Number);

// `index` will keep track of where we currently are inside the input array.
// This is a very common competitive programming technique.
// Instead of reading line by line, we move through the array one number at a time.
let index = 0;

// Read N = number of farms.
const N = input[index++];

// Read Q = number of queries.
const Q = input[index++];

// Create an array to store the closing times c[i] for each farm.
const c = new Array(N);

// Create an array to store the travel offsets t[i] for each farm.
const t = new Array(N);

// Read all N closing times into array c.
for (let i = 0; i < N; i++) {
  c[i] = input[index++];
}

// Read all N travel offsets into array t.
for (let i = 0; i < N; i++) {
  t[i] = input[index++];
}

// Create a new array `d` where:
// d[i] = c[i] - t[i]
//
// Why do we do this?
// Because the problem says Bessie can visit farm i if:
//   S + t[i] < c[i]
// Rearranging that inequality gives:
//   S < c[i] - t[i]
// So if we precompute c[i] - t[i], then for each query we just need to count
// how many values are greater than S.
const d = new Array(N);

for (let i = 0; i < N; i++) {
  d[i] = c[i] - t[i];
}

// Sort the d array in ascending order.
//
// This is important because binary search only works on sorted data.
//
// NOTE:
// JavaScript's default sort compares values as strings, which would be wrong.
// For example, [2, 10, 3] would become [10, 2, 3] if sorted as strings.
// So we must provide a numeric comparator: (a, b) => a - b
//
// After sorting, all values > S will appear in one continuous block at the end.
d.sort((a, b) => a - b);

// This function performs an "upper bound" binary search.
//
// Goal:
// Find the first index in the sorted array where arr[index] > target.
//
// Example:
// arr = [-1, 3, 4, 4, 6]
// target = 4
// answer should be index 4, because arr[4] = 6 is the first value > 4.
//
// Why this matters:
// If the first value greater than S is at position `pos`, then every value from
// pos to the end is also > S because the array is sorted.
// So the count of values > S is:
//   arr.length - pos
function upperBound(arr, target) {
  // `left` is the start of the search range.
  let left = 0;

  // `right` is one past the end of the search range.
  // We use a half-open interval [left, right), which is common in binary search.
  let right = arr.length;

  // Keep searching while the range still has at least one candidate position.
  while (left < right) {
    // Find the middle index of the current search range.
    // Math.floor ensures it is an integer.
    const mid = Math.floor((left + right) / 2);

    // If arr[mid] is less than or equal to target,
    // then mid cannot be the first index where arr[index] > target.
    // So we move `left` to mid + 1 and search the right half.
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      // Otherwise, arr[mid] > target.
      // That means mid might be the answer, but there could be an earlier index
      // that also satisfies arr[index] > target.
      // So we keep mid in the search range and move `right` to mid.
      right = mid;
    }
  }

  // When the loop ends, left === right.
  // This is the first index where arr[index] > target.
  return left;
}

// We'll store all answers here and print them at the end.
// This is usually faster than printing one line at a time.
const answers = [];

// Process each of the Q queries.
for (let query = 0; query < Q; query++) {
  // Read V = minimum number of farms Bessie wants to be able to visit.
  const V = input[index++];

  // Read S = the time Bessie wakes up.
  const S = input[index++];

  // Find the first position where d[pos] > S.
  const pos = upperBound(d, S);

  // Since all values from pos to the end are > S,
  // the number of visitable farms is N - pos.
  const countVisitable = N - pos;

  // If Bessie can visit at least V farms, answer YES.
  // Otherwise answer NO.
  if (countVisitable >= V) {
    answers.push("YES");
  } else {
    answers.push("NO");
  }
}

// Join all answers with newline characters so each answer prints on its own line.
console.log(answers.join("\n"));
