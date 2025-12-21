# 🗺️ TSPLAB

**An Interactive Visual Laboratory for the Travelling Salesman Problem**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 What is TSPLAB?

TSPLAB is a browser-based sandbox for learning and experimenting with algorithms that solve the **Travelling Salesman Problem (TSP)**—one of the most famous optimization problems in computer science. Whether you're a student learning about algorithms, an educator teaching optimization, or simply curious about how these methods work, TSPLAB makes TSP algorithms accessible and visual.

### ✨ Key Features

- 🎨 **Real-Time Visualization** - Watch tours being constructed and optimized step-by-step
- 🔧 **UI-Driven Configuration** - No coding required—configure everything through an intuitive interface
- 🧪 **Construction Heuristics** - Experiment with nearest neighbor, greedy insertion, and more
- ⚡ **Local Search Operators** - Apply 2-opt, 3-opt, Or-opt and other improvement techniques
- 📊 **Performance Comparison** - Compare algorithm results across different TSP instances
- 🎓 **Educational Focus** - Built for learning with clear visualizations and immediate feedback
- 🌐 **Browser-Based** - Runs entirely in your browser, no installation needed

---

## 🚀 Getting Started

### Prerequisites

- Node.js 25+ and npm
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/skanderk/tsplab.git
cd tsplab

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

### Quick Start

1. **Load a TSP Instance** - Choose from built-in examples or upload your own
2. **Select a Construction Heuristic** - Pick an algorithm to build an initial tour
3. **Apply Local Search** - Improve your solution with optimization operators
4. **Visualize & Compare** - Watch the algorithm work and analyze results

---

## 🧩 Supported Algorithms

### Construction Heuristics

Build initial tours from scratch:

- **Nearest Neighbor** - Greedy approach starting from a single node
- **Cheapest Insertion** - Insert nodes where they add minimum cost
- **Farthest Insertion** - Insert the most distant node first
- **Savings Algorithm** - Merge routes based on cost savings
- **Random Construction** - Baseline for comparison

### Local Search Operators

Improve existing tours:

- **2-opt** - Remove two edges and reconnect in a better way
- **3-opt** - Remove three edges and try all reconnection possibilities
- **Or-opt** - Relocate sequences of 1, 2, or 3 consecutive nodes
- **Node Swap** - Exchange positions of two nodes
- **Edge Swap** - Swap non-adjacent edges



## 📚 What is the TSP?

The **Travelling Salesman Problem** asks: Given a list of cities and distances between them, what is the shortest possible route that visits each city exactly once and returns to the starting city?

Despite its simple statement, TSP is **NP-hard**, meaning there's no known algorithm that can solve all instances efficiently. This makes it a perfect playground for exploring:

- **Heuristic algorithms** that find good (but not necessarily optimal) solutions quickly
- **Local search techniques** that iteratively improve solutions
- **Trade-offs** between solution quality and computation time

---

## 🎓 Educational Use Cases

TSPLAB is ideal for:

- **Computer Science Courses** - Algorithms, optimization, computational complexity
- **Self-Study** - Interactive learning beats reading about algorithms
- **Research** - Rapid prototyping and testing of new TSP heuristics
- **Algorithm Comparison** - Understand strengths and weaknesses of different approaches
- **Presentations** - Live demos that bring algorithms to life

---

## 🛠️ Technology Stack

- **TypeScript** - Type-safe development
- **Vite** - Fast build tooling and development server
- **Vitest** - Unit testing framework
- **SigmaJs** - High-performance graph visualization.
- **ChartJs** - Cost curves real-time visualization.
- **Svelte** - Reactive UI components.
- **Skeleton** - UI components.

---

## 🤝 Contributing

Contributions are welcome! Whether you want to:

- 🐛 Report bugs
- 💡 Suggest new features or algorithms
- 📖 Improve documentation
- 🔧 Submit pull requests


### Development

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📝 License

This project is licensed under the Apache 2 License.

---

## 🙏 Acknowledgments

- TSP instance data from [TSPLIB](http://comopt.ifi.uni-heidelberg.de/software/TSPLIB95/)
- Inspired by classic TSP research and educational tools
- Built with ❤️ for the algorithms community

---

## 📧 Contact

Have questions or feedback? Open an issue or reach out!

**Happy Exploring! 🚀**

---

<div align="center">
  <sub>Built with passion for algorithms and education</sub>
</div>