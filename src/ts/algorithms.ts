function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function heldKarp(dists: number[][]): [number, number[][]] {
  const n: number = dists.length;
  const dp: number[][] = Array.from(Array(1 << n), () => Array(n).fill(Infinity));
  dp[1][0] = 0;

  console.log(dp);
  
  for (let mask = 1; mask < (1 << n); mask++) {
      for (let u = 0; u < n; u++) {
          if (!(mask & (1 << u))) continue;
          for (let v = 0; v < n; v++) {
              if (mask & (1 << v) && u != v) {
                  dp[mask][u] = Math.min(dp[mask][u], dp[mask ^ (1 << u)][v] + dists[v][u]);
              }
          }
      }
  }

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

function backtrack(dists: number[][], dp: number[][]): number[] {
  const n: number = dists.length;
  let mask: number = (1 << n) - 1;
  let u: number = 0;
  let prev: number = 0;
  let tour: number[] = [0];

  for (let _ = 1; _ < n; _++) {
      let minDist: number = Infinity;
      for (let v = 1; v < n; v++) {
          if (mask & (1 << v) && dp[mask][v] + dists[v][u] < minDist) {
              minDist = dp[mask][v] + dists[v][u];
              prev = v;
          }
      }
      tour.push(prev);
      mask ^= (1 << prev);
      u = prev;
  }
  tour.push(0);  // Return to the starting point.
  return tour;
}

