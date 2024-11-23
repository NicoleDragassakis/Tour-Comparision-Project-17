import React, { useState } from 'react'
import Gallery from './Gallery'; //importing the gallery component
import './App.css'

function App() {
  const [app, setApp] = useState({});
  return (
    <div>
      <header>
        <h1>Tour Comparision Project</h1>
      </header>

    <main>
      <Gallery/> {/* Rendering*/}
    </main>
    </div>
  );
}

export default App
