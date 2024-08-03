// src/App.js
import React from 'react';
import './App.css';
import ItemList from './components/ItemList';
import FileUpload from './components/FileUpload';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ItemList />
                <FileUpload />
            </header>
        </div>
    );
}

export default App;