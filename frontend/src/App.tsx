import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Book from "./components/Book";
import Writing from "./components/Writing";
import MachineLearningPlayground from "./components/MachineLearningPlayground";
import MLLinearRegression from "./components/MLLinearRegression";
import MLLogisticRegression from "./components/MLLogisticRegression";
import MLKMeans from "./components/MLKMeans";
import MLDecisionTrees from "./components/MLDecisionTrees";
import AlgorithmsPlayground from "./components/AlgorithmsPlayground";
import ALSortingAlgorithm from "./components/ALSortingAlgorithm";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/book" element={<Book />} />
        <Route path="/writing" element={<Writing />} />
        <Route
          path="/machine-learning-playground"
          element={<MachineLearningPlayground />}
        />
        <Route path="/linear-regression" element={<MLLinearRegression />} />
        <Route path="/logistic-regression" element={<MLLogisticRegression />} />
        <Route path="/kmeans" element={<MLKMeans />} />
        <Route path="/decision-trees" element={<MLDecisionTrees />} />
        <Route
          path="/algorithms-playground"
          element={<AlgorithmsPlayground />}
        />
        <Route path="/sorting-algorithms" element={<ALSortingAlgorithm />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </div>
  );
}

export default App;
