import React/*, {Component}*/ from 'react';
// import PropTypes from 'prop-types';

const Selector = (props) => {
    const options = props.options || [];
    // const defaultSelection = props.defaultSelection || options[0];

    return (
        <div className="Selector" style={{ border: 'solid 1px #0088ff' }}>
            {options.map((option) =>
                <div>{option.value}</div>
            )}

            {/* <select>
                {options.map((option) =>
                    <option value={option.key} key={option.key}>{option.value}</option>
                )}
            </select> */}
        </div>
    )
}
Selector.propTypes = {
}

export default Selector;