import React, { Fragment } from "react";
import "./App.css";


import AddNewGame from "./components/AddNewGame";
import AllDataPrint from "./components/AllDataPrint";
import Header from "./components/Header";
import UpdateData from "./components/UpdateData";

function App() {
  return <Fragment>
    <Header />
    <AddNewGame />
    <AllDataPrint />
    {/* <UpdateData /> */}
    </Fragment>;
}

export default App;