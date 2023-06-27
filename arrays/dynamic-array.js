"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'dynamicArray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function dynamicArray(n, queries) {
  // Write your code here
  let arr = [];
  let lastAnswer = 0;
  let results = [];

  for (let i = 0; i < n; i++) {
    arr.push([]);
  }
  for (let i = 0; i < queries.length; i++) {
    let query = queries[i];
    let queryType = parseInt(query[0]);

    let x = parseInt(query[1]);
    let y = parseInt(query[2]);
    let seqIndex = (x ^ lastAnswer) % n;

    if (queryType === 1) {
      arr[seqIndex].push(y);
    } else if (queryType === 2) {
      let seq = arr[seqIndex];
      lastAnswer = seq[y % seq.length];
      results.push(lastAnswer);
    }
  }

  return results;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const q = parseInt(firstMultipleInput[1], 10);

  let queries = Array(q);

  for (let i = 0; i < q; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const result = dynamicArray(n, queries);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
