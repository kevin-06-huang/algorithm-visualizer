import { Point } from "../../types";

// Compute the Euclidean distance between two points
function distance(p1: Point, p2: Point): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function heldKarp(dists: number[][]): [number, number[][]] {
  const n: number = dists.length;

  // Initialize the DP table with all values set to Infinity
  // Each row in the DP table corresponds to a subset of cities (represented in binary)
  const dp: number[][] = Array.from({ length: 1 << n }, () =>
    Array(n).fill(Infinity),
  );

  // Start with just the first city (0) visited
  dp[1][0] = 0;

  // Loop over all subsets of cities
  for (let mask = 1; mask < 1 << n; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u))) continue;

      // Try to find the shortest path to city `u`
      // by considering all possible previous cities `v`
      for (let v = 0; v < n; v++) {
        if (mask & (1 << v) && u != v) {
          dp[mask][u] = Math.min(
            dp[mask][u],
            dp[mask ^ (1 << u)][v] + dists[v][u],
          );
        }
      }
    }
  }

  // Calculate the shortest cycle by returning to the starting city from every other city
  let mask = (1 << n) - 1;
  let u = 0;
  let minCost = Infinity;
  for (let v = 1; v < n; v++) {
    if (dp[mask][v] + dists[v][u] < minCost) {
      minCost = dp[mask][v] + dists[v][u];
    }
  }
  return [minCost, dp];
}

// Reconstruct the optimal tour using the DP table
function backtrack(dists: number[][], dp: number[][]): number[] {
  const n: number = dists.length;
  let mask: number = (1 << n) - 1;
  let u: number = 0;
  let prev: number = 0;
  let tour: number[] = [0];

  // Reconstruct the path by backtracking from the last city
  for (let _ = 1; _ < n; _++) {
    let minDist: number = Infinity;
    for (let v = 1; v < n; v++) {
      if (mask & (1 << v) && dp[mask][v] + dists[v][u] < minDist) {
        minDist = dp[mask][v] + dists[v][u];
        prev = v;
      }
    }
    tour.push(prev);
    mask ^= 1 << prev;
    u = prev;
  }

  // Append the starting city to form a complete cycle
  tour.push(tour[0]);
  return tour;
}

export { distance, heldKarp, backtrack };
