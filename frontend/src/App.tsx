import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Book from "./components/Book";
import Writing from "./components/Writing";
import MachineLearningPlayground from "./components/MachineLearningPlayground";

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
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </div>
  );
}

export default App;
