import React/*, { Component }*/ from 'react';
// import PropTypes from 'prop-types';
import Article from './article/Article';

const ArticleList = (props) => {
    let alex = 'Alexander Moser';
    let iris = 'Iris Dregnat';
    let [displayedName, setDisplayedName] = React.useState(alex);

    // setDisplayedName(displayedName === alex ? iris : alex);

    let start = props.start || 1;
    let count = props.count || 10;
    let articles = [];
    for (let i = start; i < start + count; ++i) {
        articles.push(i);
    }

    function onSubmit(event) {
        console.log('submited');
        event.preventDefault();
    };

    const style = {
        coworker: {
            width: '50%',
            display: 'inline-block'
        },
        customer: {
            width: '50%',
            display: 'inline-block'
        }
    }

    return (
        <div className="ArticleList">
            <form onSubmit={onSubmit}>
                <div style={style.coworker}>Mitarbeiter: {displayedName}</div>

                <div style={style.customer}>
                    Kunde: <input type="number" defaultValue="1" min="1" />
                </div>

                {articles.map((id) =>
                    <Article id={id} key={'article_' + id} />
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
ArticleList.propTypes = {
}

export default ArticleList;