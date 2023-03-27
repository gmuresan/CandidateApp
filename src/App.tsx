import React from "react";
import "./App.css";
import CandidateProvider from "./providers/CandidateProvider";

import CandidateChooser from "./components/CandidateChooser";

function App() {
  return (
    <div className="App">
      <CandidateProvider>
        <CandidateChooser />
      </CandidateProvider>
    </div>
  );
}

export default App;
