# Held-Karp Algorithm Visualizer

A dynamic visualization tool for understanding and analyzing the Held-Karp Algorithm, an exact solution for the Traveling Salesman Problem (TSP). With this visualizer, you can observe the algorithm's step-by-step progression and gain deeper insights into its functionality.

## Features

- **Dynamic Visualization**: Watch the algorithm solve TSP in real time.
- **Interactivity**: Add your own set of points and watch the optimal path evolve.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies.

## Usage

1. Run `npm start` to start the server on port 8000.
2. Access the demo application in your web browser at `http://localhost:8000`.

## Todo

1. Add heuristic approximation to Held-Karp algorithm so n>24 can be found; suggestion: branch and bound
2. For extensibility, make the algorithms language-agnostic. Maybe incorporate wasm.
3. Add more algorithms (Dijkstra, Monte Carlo, Manacher) and options to switch between different visualization.
