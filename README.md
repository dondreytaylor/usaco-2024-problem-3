# USACO Solution - JavaScript

This repository contains a JavaScript solution for the USACO problem:

**Problem link:** https://usaco.org/index.php?page=viewproblem2&cpid=1397

The goal of this README is to explain:

- what the problem is asking
- how to think about solving it
- why the solution works
- how to run the code locally
- how to use the program with input/output files

---

## 1. What the problem is asking

You are given information about `N` farms.

For each farm:

- `c[i]` = the time that farm `i` closes
- `t[i]` = how long it takes, relative to wake-up time, for Bessie to arrive at farm `i`

Then there are `Q` queries.

Each query gives:

- `V` = the minimum number of farms Bessie wants to be able to visit
- `S` = the time Bessie wakes up

If Bessie wakes up at time `S`, then she arrives at farm `i` at time:

```text
S + t[i]
```

She can only visit farm `i` if she gets there **strictly before** it closes:

```text
S + t[i] < c[i]
```

For each query, we must decide whether Bessie can visit **at least `V` farms**.

If yes, print:

```text
YES
```

Otherwise, print:

```text
NO
```

---

## 2. The important math idea

We start with the rule for when a farm can be visited:

```text
S + t[i] < c[i]
```

Now subtract `t[i]` from both sides:

```text
S < c[i] - t[i]
```

This is the key simplification.

Let us define a new value for every farm:

```text
d[i] = c[i] - t[i]
```

Then the condition becomes:

```text
S < d[i]
```

That means:

- a farm is visitable if `d[i]` is greater than `S`
- for each query, we only need to count how many `d[i]` values are greater than `S`

So the original problem becomes:

> For each query `(V, S)`, determine whether at least `V` values in the array `d` are greater than `S`.

That is much easier to solve efficiently.

---

## 3. Why sorting helps

Suppose we compute all values `d[i]` and sort them.

Example:

```text
[-1, 3, 4, 4, 6]
```

Now suppose `S = 3`.

We need to count how many values are greater than `3`.

In the sorted array, those values are all grouped together at the end:

```text
4, 4, 6
```

So instead of checking every farm one by one, we can use **binary search** to find the first position where values become greater than `S`.

If that position is `pos`, then:

```text
count = N - pos
```

because every value from `pos` to the end is greater than `S`.

---

## 4. Why binary search is needed

The constraints are large, so we cannot afford a slow solution.

If we checked every farm for every query, that would take:

```text
O(N * Q)
```

That is too slow when both `N` and `Q` are large.

Instead, we do this:

1. Compute `d[i] = c[i] - t[i]` for all farms
2. Sort `d`
3. For each query, use binary search to count how many values are greater than `S`

This gives:

```text
O(N log N + Q log N)
```

which is fast enough.

---

## 5. Full algorithm

### Step 1
Read input values:

- `N`, `Q`
- array `c`
- array `t`
- the `Q` queries

### Step 2
Build a new array:

```text
d[i] = c[i] - t[i]
```

### Step 3
Sort the `d` array in increasing order.

### Step 4
For each query `(V, S)`:

- find the first index `pos` such that `d[pos] > S`
- compute `count = N - pos`
- if `count >= V`, print `YES`
- otherwise, print `NO`

---

## 6. Why the solution is correct

A farm can be visited exactly when:

```text
S + t[i] < c[i]
```

This is equivalent to:

```text
S < c[i] - t[i]
```

and with `d[i] = c[i] - t[i]`, that becomes:

```text
S < d[i]
```

So the number of farms Bessie can visit is exactly the number of `d[i]` values greater than `S`.

Sorting the array does not change how many such values exist. It only makes them easier to count.

Binary search correctly finds the first position where values become greater than `S`, so the number of valid farms is exactly:

```text
N - pos
```

Therefore, the algorithm is correct.

---

## 7. Time complexity

- Building the `d` array: `O(N)`
- Sorting the array: `O(N log N)`
- Each query with binary search: `O(log N)`
- Total for all queries: `O(Q log N)`

Overall time complexity:

```text
O(N log N + Q log N)
```

Space complexity:

```text
O(N)
```

---

## 8. Project structure

```text
.
├── README.md
└── solution.js
```

---

## 9. How to run the solution

### Requirements

You need:

- [Node.js](https://nodejs.org/) installed

Check that Node is installed:

```bash
node -v
```

---

## 10. Run with manual input

You can run the file and type input directly:

```bash
node solution.js
```

Then paste the input and press:

- `Ctrl+D` on macOS/Linux
- `Ctrl+Z` then Enter on Windows

---

## 11. Run with an input file

Create a file called `input.txt`:

```text
5 3
3 5 7 9 12
4 2 3 3 8
3 3
2 4
1 10
```

Then run:

```bash
node solution.js < input.txt
```

Example output:

```text
YES
NO
NO
```

---

## 12. Example walkthrough

Suppose:

```text
c = [3, 5, 7, 9, 12]
t = [4, 2, 3, 3, 8]
```

Compute:

```text
d = [3-4, 5-2, 7-3, 9-3, 12-8]
d = [-1, 3, 4, 6, 4]
```

Sort it:

```text
[-1, 3, 4, 4, 6]
```

Now consider query:

```text
V = 3, S = 3
```

We need values greater than `3`:

```text
4, 4, 6
```

That is 3 farms, so the answer is:

```text
YES
```

---

## 13. How to create a GitHub repository for this

### Option A: Create a new local folder and push it

```bash
mkdir usaco-farm-queries
cd usaco-farm-queries
```

Copy these files into the folder:

- `README.md`
- `solution.js`

Initialize git:

```bash
git init
```

Add the files:

```bash
git add README.md solution.js
```

Commit them:

```bash
git commit -m "Add USACO JavaScript solution"
```

Create a new empty GitHub repository on GitHub, then connect it:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Rename your branch to `main`:

```bash
git branch -M main
```

Push it:

```bash
git push -u origin main
```

---

## 14. Optional `.gitignore`

You can also add a `.gitignore` file like this:

```gitignore
node_modules/
*.log
```

For this small script, it is optional, but it is still a good habit.

---

## 15. Final notes

This problem looks complicated at first, but the trick is noticing that:

```text
S + t[i] < c[i]
```

can be rewritten as:

```text
S < c[i] - t[i]
```

That transformation turns the problem into a sorting + binary search problem.

That is a very common competitive programming pattern:

- rewrite the condition
- precompute useful values
- sort once
- answer many queries quickly

