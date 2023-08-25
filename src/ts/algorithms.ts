function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function heldKarp(dists: number[][]): [number, number[]] {
  const n: number = dists.length;
  const dp: number[][] = Array.from(Array(1 << n), () => Array(n).fill(Infinity));
  const prev: number[][] = Array.from(Array(1 << n), () => Array(n).fill(-1));
  
  dp[1][0] = 0;

  for (let mask = 1; mask < (1 << n); mask++) {
      for (let u = 0; u < n; u++) {
          if (!(mask & (1 << u))) continue;
          for (let v = 0; v < n; v++) {
              if (mask & (1 << v) && u != v) {
                  if (dp[mask][u] > dp[mask ^ (1 << u)][v] + dists[v][u]) {
                      dp[mask][u] = dp[mask ^ (1 << u)][v] + dists[v][u];
                      prev[mask][u] = v;  // Store the predecessor
                  }
              }
          }
      }
  }

  // Reconstruct the path using the prev table
  let mask = (1 << n) - 1;
  let u = 0;
  let lastNode = -1;
  let minCost = Infinity;
  for (let v = 1; v < n; v++) {
      if (dp[mask][v] + dists[v][u] < minCost) {
          minCost = dp[mask][v] + dists[v][u];
          lastNode = v;
      }
  }

  let path: number[] = [];
  path.push(0);
  path.push(lastNode);
  mask ^= (1 << lastNode);
  u = lastNode;

  while (u != 0) {
      const v = prev[mask][u];
      path.push(v);
      mask ^= (1 << u);
      u = v;
  }

  path.reverse();  // Reverse the path to get the correct order
  path.push(0);  // Return to the starting point

  return [minCost, path];
}
