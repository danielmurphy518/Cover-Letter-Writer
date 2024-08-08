// src/App.js
import React from 'react';
import './App.css';
import ItemList from './components/ItemList';
import FileUpload from './components/FileUpload';
import Main from './components/Main';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Main/>
            </header>
        </div>
    );
}

export default App;