// /client/App.js
import React, { Component } from 'react';
// import ClothesApi from './ClothesApi';
import ArticleList from './components/articleList/ArticleList';

class App extends Component {
    render() {
        return (
            <div>
                <ArticleList />
                {/* <ClothesApi /> */}
            </div>
        );
    }
}

export default App;
