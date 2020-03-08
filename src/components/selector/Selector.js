import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

const Selector = (props) => {
    const options = props.options || [];
    options.sort((a, b) => (a.value > b.value) ? 1 : (a.value < b.value) ? -1 : 0);
    let open = false;

    const selectionRef = React.createRef();
    const selectionBoxRef = React.createRef();

    useEffect(() => {
        document.addEventListener('click', onClickOutside);

        return function cleanUp() {
            document.removeEventListener('click', onClickOutside);
        }
    })

    function onClickInside() {
        open = true;
        selectionBoxRef.current.style.display = 'block';
    };

    function onClickOutside(event) {
        if (open && !selectionRef.current.contains(event.target) && !selectionBoxRef.current.contains(event.target)) {
            open = false;
            selectionBoxRef.current.style.display = 'none';

            let length = selectionBoxRef.current.children.length;
            for (var i = 0; i < length; ++i) {
                let child = selectionBoxRef.current.children[i];
                child.style.display = 'block';
            }
        }
    };

    function onChange(event) {
        let value = event.target.value.toLowerCase();
        let length = selectionBoxRef.current.children.length;

        for (var i = 0; i < length; ++i) {
            let child = selectionBoxRef.current.children[i];
            let childValue = child.innerText.toLowerCase();
            if (childValue.indexOf(value) !== 0) {
                child.style.display = 'none';
            }
            else {
                child.style.display = 'block';
            }
        }
    };

    function onClickSelection(value) {
        selectionRef.current.value = value;
    };

    const style = {
        container: {
            position: 'relative',
        },
        selection: {
            display: 'block',
            width: '100%',
        },
        selectionBox: {
            display: 'none',
            position: 'absolute',
            width: '100%',
            zIndex: 10,
            backgroundColor: 'white',
            border: 'solid black 1px',
        },
    };

    return (
        <div className="Selector" style={style.container} onClick={onClickInside}>
            <input placeholder="Bezeichnung" style={style.selection} ref={selectionRef} onChange={onChange}/>

            <div ref={selectionBoxRef} style={style.selectionBox}>
                {options.map((option) =>
                    <div key={option.key} onClick={() => onClickSelection(option.value)}>{option.value}</div>
                )}
            </div>
        </div>
    )
}
Selector.propTypes = {
}

export default Selector;