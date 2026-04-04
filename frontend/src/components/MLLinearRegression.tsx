import { useMemo, useState } from "react";

type Point = {
  x: number;
  y: number;
};

const WIDTH = 760;
const HEIGHT = 360;
const PADDING = 40;

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function generateData(
  count: number,
  trueSlope: number,
  trueIntercept: number,
  noise: number,
  seed: number,
): Point[] {
  const rand = createSeededRandom(seed);
  const points: Point[] = [];

  for (let i = 0; i < count; i += 1) {
    const x = i / (count - 1);
    const randomNoise = (rand() - 0.5) * 2 * noise;
    const y = trueSlope * x + trueIntercept + randomNoise;
    points.push({ x, y });
  }

  return points;
}

function fitLinearRegression(points: Point[]) {
  const n = points.length;
  if (n === 0) {
    return { slope: 0, intercept: 0 };
  }

  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0);

  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) {
    return { slope: 0, intercept: sumY / n };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

function mse(points: Point[], slope: number, intercept: number) {
  if (points.length === 0) {
    return 0;
  }

  const total = points.reduce((acc, p) => {
    const error = p.y - (slope * p.x + intercept);
    return acc + error * error;
  }, 0);

  return total / points.length;
}

function mapX(x: number) {
  return PADDING + x * (WIDTH - PADDING * 2);
}

function mapY(y: number, minY: number, maxY: number) {
  const ratio = (y - minY) / (maxY - minY || 1);
  return HEIGHT - PADDING - ratio * (HEIGHT - PADDING * 2);
}

export default function MLLinearRegression() {
  const [trueSlope, setTrueSlope] = useState(1.2);
  const [trueIntercept, setTrueIntercept] = useState(0.2);
  const [noise, setNoise] = useState(0.12);
  const [guessSlope, setGuessSlope] = useState(0.8);
  const [guessIntercept, setGuessIntercept] = useState(0.4);
  const [seed, setSeed] = useState(42);

  const points = useMemo(
    () => generateData(24, trueSlope, trueIntercept, noise, seed),
    [trueSlope, trueIntercept, noise, seed],
  );

  const fitted = useMemo(() => fitLinearRegression(points), [points]);

  const stats = useMemo(() => {
    const n = points.length;
    const sumX = points.reduce((acc, p) => acc + p.x, 0);
    const sumY = points.reduce((acc, p) => acc + p.y, 0);
    const sumXY = points.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = points.reduce((acc, p) => acc + p.x * p.x, 0);
    const denominator = n * sumX2 - sumX * sumX;

    return { n, sumX, sumY, sumXY, sumX2, denominator };
  }, [points]);

  const yValues = points.map((p) => p.y);
  const lineValues = [
    trueIntercept,
    trueSlope + trueIntercept,
    fitted.intercept,
    fitted.slope + fitted.intercept,
    guessIntercept,
    guessSlope + guessIntercept,
  ];
  const minY = Math.min(...yValues, ...lineValues) - 0.1;
  const maxY = Math.max(...yValues, ...lineValues) + 0.1;

  const fitMse = mse(points, fitted.slope, fitted.intercept);
  const guessMse = mse(points, guessSlope, guessIntercept);

  const fitStart = `${mapX(0)},${mapY(fitted.intercept, minY, maxY)}`;
  const fitEnd = `${mapX(1)},${mapY(fitted.slope + fitted.intercept, minY, maxY)}`;
  const guessStart = `${mapX(0)},${mapY(guessIntercept, minY, maxY)}`;
  const guessEnd = `${mapX(1)},${mapY(guessSlope + guessIntercept, minY, maxY)}`;

  return (
    <section style={{ maxWidth: "920px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "8px" }}>
        Interactive Blog: Linear Regression
      </h2>
      <p style={{ marginTop: 0, color: "#444", lineHeight: 1.6 }}>
        Linear regression finds the best line through data by minimizing squared
        errors. Move the sliders, regenerate noise, and compare your guessed
        line against the fitted line.
      </p>

      <article
        style={{
          border: "1px solid #d8d8d8",
          borderRadius: "12px",
          padding: "18px",
          backgroundColor: "#fffdf8",
        }}
      >
        <h3 style={{ marginTop: 0 }}>1) Create Data</h3>
        <p style={{ lineHeight: 1.6 }}>
          This synthetic dataset follows y = mx + b + noise where m is slope and
          b is intercept.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <label>
            True slope: {trueSlope.toFixed(2)}
            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={trueSlope}
              onChange={(e) => setTrueSlope(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            True intercept: {trueIntercept.toFixed(2)}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={trueIntercept}
              onChange={(e) => setTrueIntercept(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Noise: {noise.toFixed(2)}
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={() => setSeed((prev) => prev + 1)}
          style={{
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            marginBottom: "18px",
          }}
        >
          Regenerate Random Noise
        </button>

        <h3>2) Fit and Compare Lines</h3>
        <p style={{ lineHeight: 1.6 }}>
          Blue is the fitted line (ordinary least squares). Orange is your
          guess. Try to reduce your guess MSE.
        </p>

        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            marginBottom: "16px",
          }}
          role="img"
          aria-label="Scatter plot with linear regression lines"
        >
          <line
            x1={PADDING}
            y1={HEIGHT - PADDING}
            x2={WIDTH - PADDING}
            y2={HEIGHT - PADDING}
            stroke="#888"
          />
          <line
            x1={PADDING}
            y1={PADDING}
            x2={PADDING}
            y2={HEIGHT - PADDING}
            stroke="#888"
          />

          {points.map((p, index) => (
            <circle
              key={`${p.x}-${index}`}
              cx={mapX(p.x)}
              cy={mapY(p.y, minY, maxY)}
              r="4"
              fill="#1f2937"
              opacity="0.85"
            />
          ))}

          <line
            x1={fitStart.split(",")[0]}
            y1={fitStart.split(",")[1]}
            x2={fitEnd.split(",")[0]}
            y2={fitEnd.split(",")[1]}
            stroke="#2563eb"
            strokeWidth="3"
          />
          <line
            x1={guessStart.split(",")[0]}
            y1={guessStart.split(",")[1]}
            x2={guessEnd.split(",")[0]}
            y2={guessEnd.split(",")[1]}
            stroke="#ea580c"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
        </svg>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "12px",
            marginBottom: "14px",
          }}
        >
          <label>
            Your slope: {guessSlope.toFixed(2)}
            <input
              type="range"
              min="-2"
              max="2"
              step="0.05"
              value={guessSlope}
              onChange={(e) => setGuessSlope(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Your intercept: {guessIntercept.toFixed(2)}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.05"
              value={guessIntercept}
              onChange={(e) => setGuessIntercept(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </label>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "10px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          <p style={{ margin: 0 }}>
            Fitted slope/intercept: <b>{fitted.slope.toFixed(3)}</b> /{" "}
            <b>{fitted.intercept.toFixed(3)}</b>
          </p>
          <p style={{ margin: 0 }}>
            Fitted MSE: <b>{fitMse.toFixed(4)}</b>
          </p>
          <p style={{ margin: 0 }}>
            Your MSE: <b>{guessMse.toFixed(4)}</b>
          </p>
        </div>

        <h3 style={{ marginTop: "18px" }}>3) Mathematical Explanation</h3>
        <p style={{ lineHeight: 1.6 }}>
          We model each point with y_hat = m*x + b. The residual for point i is
          e_i = y_i - (m*x_i + b).
        </p>
        <p style={{ lineHeight: 1.6 }}>
          Linear regression chooses m and b to minimize the mean squared error:
          J(m, b) = (1/n) * sum(e_i^2).
        </p>
        <p style={{ lineHeight: 1.6 }}>
          The closed-form ordinary least squares solution is: m =
          (n*sum(x_i*y_i) - sum(x_i)*sum(y_i)) / (n*sum(x_i^2) - (sum(x_i))^2)
          <br />b = (sum(y_i) - m*sum(x_i)) / n
        </p>
        <div
          style={{
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "12px",
            marginBottom: "8px",
          }}
        >
          <p style={{ margin: "0 0 8px 0" }}>
            Current dataset values: n = <b>{stats.n}</b>, sum(x) ={" "}
            <b>{stats.sumX.toFixed(3)}</b>, sum(y) ={" "}
            <b>{stats.sumY.toFixed(3)}</b>, sum(xy) ={" "}
            <b>{stats.sumXY.toFixed(3)}</b>, sum(x^2) ={" "}
            <b>{stats.sumX2.toFixed(3)}</b>
          </p>
          <p style={{ margin: "0 0 8px 0" }}>
            Denominator = n*sum(x^2) - (sum(x))^2 ={" "}
            <b>{stats.denominator.toFixed(3)}</b>
          </p>
          <p style={{ margin: 0 }}>
            Therefore m = <b>{fitted.slope.toFixed(3)}</b> and b ={" "}
            <b>{fitted.intercept.toFixed(3)}</b> for this generated sample.
          </p>
        </div>

        <h3 style={{ marginTop: "18px" }}>4) Key Takeaway</h3>
        <p style={{ marginBottom: 0, lineHeight: 1.6 }}>
          As noise increases, every line fits worse, but least squares still
          gives the line with minimum average squared error for this dataset.
        </p>
      </article>
    </section>
  );
}
