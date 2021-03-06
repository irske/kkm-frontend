import React/*, { Component }*/ from 'react';
// import PropTypes from 'prop-types';
import Selector from '../../selector/selector';

const Article = (props) => {
    const id = props.id;
    const options = [
        { key: 'trousers', value: 'Hose' },
        { key: 'sweater', value: 'Pulli' },
        { key: 'dress', value: 'Kleid' },
        { key: 'misc', value: 'Sonstiges' },
    ];

    function printValue(event) {
        console.log(event.target.value);
    };

    const style = {
        container: {
            marginTop: '5px'
        },
        id: {
            width: '30px',
            display: 'inline-block',
            textAlign: 'right',
            padding: '0 10px',
        },
        input: {
            display: 'inline-block',
            width: '75px',
            margin: '0 5px',
        },
        description: {
            width: '150px',
            margin: '0 05px',
        },
    };

    return (
        <div className="Article" style={style.container}>
            <div style={style.id}>{id}.</div>

            <div style={style.input}>
                <Selector options={options}/>
            </div>

            <div style={style.input}>
                <Selector options={options}/>
            </div>

            <div style={style.input}>
                <Selector options={options}/>
            </div>

            <input type="text" style={style.input} placeholder="Sonstiges" onChange={printValue} />

            <input type="number" style={style.input} min="1" placeholder="Stück" onChange={printValue} />

            <input type="number" style={style.input} min="1" placeholder="Größe" onChange={printValue} />

            <input type="text" style={style.description} placeholder="Beschreibung" onChange={printValue} />

            <input type="number" style={style.input} min="0" placeholder="Preis" onChange={printValue} />
        </div>
    )
}
Article.propTypes = {
    // printValue: PropTypes.func
}

export default Article;