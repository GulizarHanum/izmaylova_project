import React from "react";
import useThemes from "./theme";
import {ThemeProvider} from "@material-ui/core/styles";
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Layout from "./Layout";
import {ToastContainer} from "react-toastify";

function App() {
  return (
      <div className="App">
        <ThemeProvider theme={useThemes}>
          <Router>
            <Layout/>
            <ToastContainer position="top-right"/>
          </Router>
        </ThemeProvider>
      </div>
  );
}

export default App;
