import React, { useState } from "react"

import './App.css';
import Settings from './components/Settings';
import Canvas from './components/Canvas';
import { chartData } from "./data";


function App() {
  const [chartType, setChartType] = useState('os');
  const [startChart, setStartChart] = useState(false);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        padding: '30px'
      }}
      className="App">
      <Settings
        chartType={chartType}
        setChartType={setChartType}
        setStartChart={setStartChart}
      />
      <Canvas
        chartData={chartData}
        chartType = {chartType}
        startChart = {startChart}
      />
    </div>
  );
}

export default App;
