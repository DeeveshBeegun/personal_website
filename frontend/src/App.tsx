import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Chatbot from "./components/Chatbot";
import Projects from "./components/Projects";
import Book from "./components/Book";
import MLLinearRegression from "./components/MLLinearRegression";
import MLLogisticRegression from "./components/MLLogisticRegression";
import MLKMeans from "./components/MLKMeans";
import MLDecisionTrees from "./components/MLDecisionTrees";
import ALSortingAlgorithm from "./components/ALSortingAlgorithm";
import SandboxKubernetes from "./components/SandboxKubernetes";
import SandboxKafka from "./components/SandboxKafka";
import Temporary from "./components/UnderConstruction";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/book" element={<Book />} />
        <Route path="/writing" element={<Temporary />} />
        <Route path="/machine-learning-playground" element={<Temporary />} />
        <Route path="/linear-regression" element={<MLLinearRegression />} />
        <Route path="/logistic-regression" element={<MLLogisticRegression />} />
        <Route path="/kmeans" element={<MLKMeans />} />
        <Route path="/decision-trees" element={<MLDecisionTrees />} />
        <Route path="/algorithms-playground" element={<Temporary />} />
        <Route path="/sorting-algorithms" element={<ALSortingAlgorithm />} />
        <Route path="/sandbox" element={<Temporary />} />
        <Route path="/sandbox-kubernetes" element={<SandboxKubernetes />} />
        <Route path="/sandbox-kafka" element={<SandboxKafka />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
