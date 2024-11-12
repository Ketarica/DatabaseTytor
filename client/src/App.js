import React, { Fragment } from "react";
import "./App.css";


import AddNewGame from "./components/AddNewGame";
import AllDataPrint from "./components/AllDataPrint";
import Header from "./components/Header";

function App() {
  return <Fragment>
    <Header />
    <AddNewGame />
    <AllDataPrint />
    </Fragment>;
}

export default App;