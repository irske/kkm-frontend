// /client/App.js
import React, { Component } from 'react';
import CoworkerApi from './components/coworker/coworker';
import ArticleList from './components/articleList/articleList';

class App extends Component {
    render() {
        return (
            <div>
                <CoworkerApi/>
                <ArticleList/>
            </div>
        );
    }
}

export default App;
