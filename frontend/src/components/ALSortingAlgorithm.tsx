import { useState } from "react";

type Algorithm = "bubble" | "quick" | "merge";

interface SortState {
  array: number[];
  comparing: number[];
  sorted: number[];
  comparisons: number;
  swaps: number;
  isRunning: boolean;
  isComplete: boolean;
}

function createRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

async function bubbleSort(
  arr: number[],
  onStateChange: (state: Partial<SortState>) => void,
  delay: number,
): Promise<{ comparisons: number; swaps: number }> {
  let comparisons = 0;
  let swaps = 0;
  const array = [...arr];
  const n = array.length;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n - i - 1; j += 1) {
      comparisons += 1;
      onStateChange({
        array: [...array],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
      });

      await new Promise((resolve) => setTimeout(resolve, delay));

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps += 1;
      }
    }
  }

  onStateChange({
    array,
    comparing: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
  });

  return { comparisons, swaps };
}

async function quickSort(
  arr: number[],
  onStateChange: (state: Partial<SortState>) => void,
  delay: number,
): Promise<{ comparisons: number; swaps: number }> {
  let comparisons = 0;
  let swaps = 0;
  const array = [...arr];
  const sorted = new Set<number>();

  const partition = async (low: number, high: number): Promise<number> => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j += 1) {
      comparisons += 1;
      onStateChange({
        array: [...array],
        comparing: [j, high],
        sorted: Array.from(sorted),
      });
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (array[j] < pivot) {
        i += 1;
        [array[i], array[j]] = [array[j], array[i]];
        swaps += 1;
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    swaps += 1;
    return i + 1;
  };

  const sort = async (low: number, high: number): Promise<void> => {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    } else if (low === high) {
      sorted.add(low);
    }
  };

  await sort(0, array.length - 1);

  onStateChange({
    array,
    comparing: [],
    sorted: Array.from({ length: array.length }, (_, i) => i),
    comparisons,
    swaps,
  });

  return { comparisons, swaps };
}

export default function ALSortingAlgorithm() {
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [arraySize, setArraySize] = useState(20);
  const [speed, setSpeed] = useState(50);
  const [state, setState] = useState<SortState>({
    array: createRandomArray(20),
    comparing: [],
    sorted: [],
    comparisons: 0,
    swaps: 0,
    isRunning: false,
    isComplete: false,
  });

  const handleSort = async () => {
    setState((prev) => ({ ...prev, isRunning: true }));

    const delay = Math.max(1, 100 - speed);
    let result = { comparisons: 0, swaps: 0 };

    if (algorithm === "bubble") {
      result = await bubbleSort(
        state.array,
        (newState) => {
          setState((prev) => ({ ...prev, ...newState }));
        },
        delay,
      );
    } else if (algorithm === "quick") {
      result = await quickSort(
        state.array,
        (newState) => {
          setState((prev) => ({ ...prev, ...newState }));
        },
        delay,
      );
    }

    setState((prev) => ({
      ...prev,
      isRunning: false,
      isComplete: true,
      comparisons: result.comparisons,
      swaps: result.swaps,
    }));
  };

  const handleReset = () => {
    const newArray = createRandomArray(arraySize);
    setState({
      array: newArray,
      comparing: [],
      sorted: [],
      comparisons: 0,
      swaps: 0,
      isRunning: false,
      isComplete: false,
    });
  };

  const handleArraySizeChange = (newSize: number) => {
    setArraySize(newSize);
    const newArray = createRandomArray(newSize);
    setState({
      array: newArray,
      comparing: [],
      sorted: [],
      comparisons: 0,
      swaps: 0,
      isRunning: false,
      isComplete: false,
    });
  };

  const maxValue = Math.max(...state.array, 1);

  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>Interactive: Sorting Algorithms</h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Visualize how different sorting algorithms work. Watch the algorithm
        compare and swap elements step by step.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>1) Configure &amp; Run</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <label>
            Algorithm:
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
              disabled={state.isRunning}
              style={{ width: "100%", marginTop: "4px", padding: "6px" }}
            >
              <option value="bubble">Bubble Sort</option>
              <option value="quick">Quick Sort</option>
            </select>
          </label>

          <label>
            Array Size: {arraySize}
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => handleArraySizeChange(Number(e.target.value))}
              disabled={state.isRunning}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </label>

          <label>
            Speed: {speed}
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={state.isRunning}
              style={{ width: "100%", marginTop: "4px" }}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
          <button
            type="button"
            onClick={handleSort}
            disabled={state.isRunning}
            style={{
              padding: "10px 16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: state.isRunning ? "not-allowed" : "pointer",
              opacity: state.isRunning ? 0.6 : 1,
            }}
          >
            {state.isRunning ? "Sorting..." : "Start"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={state.isRunning}
            style={{
              padding: "10px 16px",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: state.isRunning ? "not-allowed" : "pointer",
              opacity: state.isRunning ? 0.6 : 1,
            }}
          >
            Reset
          </button>
        </div>

        <h3>2) Visualization</h3>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "2px",
            height: "300px",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "8px",
            marginBottom: "18px",
          }}
        >
          {state.array.map((value, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: state.sorted.includes(index)
                  ? "#10b981"
                  : state.comparing.includes(index)
                    ? "#f59e0b"
                    : "#3b82f6",
                borderRadius: "2px",
                transition: "background-color 0.1s ease",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "18px",
          }}
        >
          <p style={{ margin: 0 }}>
            Comparisons: <b>{state.comparisons}</b>
          </p>
          <p style={{ margin: 0 }}>
            Swaps: <b>{state.swaps}</b>
          </p>
          <p style={{ margin: 0 }}>
            Status: <b>{state.isComplete ? "Complete ✓" : "Ready"}</b>
          </p>
        </div>

        <h3>3) Algorithm Explanations</h3>

        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ margin: "8px 0" }}>Bubble Sort</h4>
          <p style={{ margin: "0 0 8px 0", lineHeight: 1.6 }}>
            Repeatedly steps through the list, compares adjacent elements, and
            swaps them if they&apos;re in the wrong order. Time complexity:
            O(n²).
          </p>
        </div>

        <div>
          <h4 style={{ margin: "8px 0" }}>Quick Sort</h4>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            Divides the array by selecting a pivot and partitioning elements
            smaller/larger than the pivot, then recursively sorts each
            partition. Average time complexity: O(n log n).
          </p>
        </div>
      </article>
    </section>
  );
}
