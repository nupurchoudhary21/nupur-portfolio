// import {Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import ScrollSpy from "./components/ScrollSpy";
import Certificates from "./components/Certificates";
import Projects from "./components/Projects";
import Contacts from "./components/Contacts";

function App() {
  return (
    <>
      <ScrollSpy />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Contacts />
    </>
  );
}

export default App;
