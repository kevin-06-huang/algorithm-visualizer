// This function calculates the Euclidean distance between two points.
function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function heldKarp(dists: number[][]): [number, number[]] {
  // Number of cities or nodes.
  const n: number = dists.length;

  // dp table will store the minimum cost of visiting a subset of cities.
  const dp: number[][] = Array.from(Array(1 << n), () =>
    Array(n).fill(Infinity),
  );

  // prev table will store predecessors to help reconstruct the path later.
  const prev: number[][] = Array.from(Array(1 << n), () => Array(n).fill(-1));

  // Base case: The cost of visiting just the first city (0) is 0.
  dp[1][0] = 0;

  // Iterate over all subsets of cities.
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let u = 0; u < n; u++) {
      // If city u is not in the current subset, continue.
      if (!(mask & (1 << u))) continue;

      for (let v = 0; v < n; v++) {
        // If city v is in the subset and u is not equal to v.
        if (mask & (1 << v) && u != v) {
          // Update the dp table if we find a shorter path.
          if (dp[mask][u] > dp[mask ^ (1 << u)][v] + dists[v][u]) {
            dp[mask][u] = dp[mask ^ (1 << u)][v] + dists[v][u];
            prev[mask][u] = v; // Store the city v which led to the shorter path.
          }
        }
      }
    }
  }

  // Start reconstructing the path from the end.
  let mask = (1 << n) - 1; // Represents all cities being visited.
  let u = 0; // Start city.
  let lastNode = -1;
  let minCost = Infinity;

  // Find the city v that gives the minimum cost when ending the path at city v.
  for (let v = 1; v < n; v++) {
    if (dp[mask][v] + dists[v][u] < minCost) {
      minCost = dp[mask][v] + dists[v][u];
      lastNode = v;
    }
  }

  let path: number[] = [];
  path.push(0);
  path.push(lastNode);
  mask ^= 1 << lastNode; // Remove city lastNode from the mask.
  u = lastNode;

  // Backtrack the path using the prev table.
  while (u != 0) {
    const v = prev[mask][u];
    path.push(v);
    mask ^= 1 << u; // Remove city u from the mask.
    u = v;
  }

  // The path is built in reverse order, so we need to reverse it.
  path.reverse();

  // Append the start city to complete the cycle.
  path.push(0);

  return [minCost, path]; // Return the minimum cost and the corresponding path.
}
