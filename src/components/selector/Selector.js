import React/*, {Component}*/ from 'react';
// import PropTypes from 'prop-types';

const Selector = (props) => {
    const options = props.options || [];
    const defaultSelection = props.defaultSelection || options[0];
    const selection = defaultSelection;

    const selectionRef = React.createRef();
    const selectionBoxRef = React.createRef();

    const expand = () => {
        console.log('clicked');
        selectionRef.current.style.display = 'none';
        selectionBoxRef.current.style.display = 'block';
    };

    return (
        <div className="Selector" style={{ border: 'solid 1px #0088ff' }} onClick={() => expand()}>
            <div ref={selectionRef}>{selection.value}</div>

            <div ref={selectionBoxRef} style={{ display: 'none' }}>
                {options.map((option) =>
                    <div key={option.key}>{option.value}</div>
                )}
            </div>
        </div>
    )
}
Selector.propTypes = {
}

export default Selector;