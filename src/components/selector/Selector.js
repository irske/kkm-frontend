import React, { useEffect }/*, {Component}*/ from 'react';
import { PlacesChildFriendly } from 'material-ui/svg-icons';
// import PropTypes from 'prop-types';

const Selector = (props) => {
    const options = props.options || [];
    const defaultSelection = props.defaultSelection || options[0];
    const selection = defaultSelection;
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

    function onChange(value) {
        let length = selectionBoxRef.current.children.length;

        for (var i = 0; i < length; ++i) {
            let child = selectionBoxRef.current.children[i];
            if (child.innerText.indexOf(value) !== 0) {
                child.style.display = 'none';
            }
            else {
                child.style.display = 'block';
            }
        }
    }

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
        <div className="Selector" style={style.container} onClick={() => onClickInside()}>
            <input style={style.selection} ref={selectionRef} onChange={(e) => onChange(e.target.value)}/>
            {/* <div ref={selectionRef} style={style.selection}>{selection.value}</div> */}

            <div ref={selectionBoxRef} style={style.selectionBox}>
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