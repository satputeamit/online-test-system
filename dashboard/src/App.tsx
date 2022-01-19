import React from 'react';
import './App.css';
import Base from './component/base/base.component';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { observer } from 'mobx-react-lite';

const App=observer(()=> {
  return (
    <Router>
      <div className="App">
        <Base></Base>
      </div>
    </Router>
  );
}
);
export default App;
