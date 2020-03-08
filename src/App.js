// /client/App.js
import React, { Component } from 'react';
import MitarbeiterApi from './MitarbeiterApi';
import ArticleList from './components/articleList/ArticleList';

class App extends Component {
    render() {
        return (
            <div>
                <MitarbeiterApi />
                <ArticleList/>
            </div>
        );
    }
}

export default App;
