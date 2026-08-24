import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          <br />
          hello world, this is a node react application
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {data && (
          <div className="api-response">
            <h3>Server Response (/api/data):</h3>
            <p><strong>Message:</strong> {data.message}</p>
            <p><strong>multiply(5, 3):</strong> {data.multiply}</p>
            <p><strong>divide(10, 2):</strong> {data.divide}</p>
            <p><strong>testFunc(5, 3):</strong> {data.result}</p>
            <p><strong>testFunc3(5, 3):</strong> {data.result3}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
