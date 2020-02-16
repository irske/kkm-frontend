
// /client/App.js
import React, { Component } from 'react';
import ClothesApi from './ClothesApi';
import ClothList from './ClothList';

class App extends Component {
    render() {
        return (
            <div>
                <ClothList />
            </div>
        );
    }
}

export default App;
