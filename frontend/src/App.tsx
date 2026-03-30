import Header from "./components/Header";
import About from "./components/About";
import { useEffect } from 'react';
import ReactGA from 'react-ga4';


function App() {
  useEffect(() => {
    ReactGA.initialize('G-L8PVE881L9');
  })
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <Header />
      <About />
    </div>
  );
}

export default App;
