
// /client/App.js
import React, { useState, Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';


function ClothList() {

    const [state, setState] = useState(
        {
            cloth: [],
            id: 0,
            name: null,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
        }
    );

    const componentDidMount = () => {
        getClothFromDb();
        if (!state.intervalIsSet) {
            let interval = setInterval(getClothFromDb, 1000);
            setState({ intervalIsSet: interval });
        }
    }

// always kill a process everytime we are done using it
    const componentWillUnmount = () => {
        if (state.intervalIsSet) {
            clearInterval(state.intervalIsSet);
            setState({ intervalIsSet: null });
        }
    }
// fetch data from our data base
    const getClothFromDb = () => {
        fetch('http://localhost:9000/cloth/getCloth')
            .then((cloth) => cloth.json())
            .then((res) => setState({ cloth: res.cloth }));
    };

// to remove existing database information
    const deleteFromDB = (idToDelete) => {
        parseInt(idToDelete);
        let objIdToDelete = null;
        this.setState({ id:idToDelete });
        state.forEach((dat) => {
            if (dat.id == idToDelete) {
                objIdToDelete = dat.id;
            }
        });
        axios.delete('http://localhost:9000/cloth/deleteCloth', {
            data: {
                id: objIdToDelete
            },
        });

    };

// to overwrite existing data base information
    const updateDB = (idToUpdate, updateName, updateMessage) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        setState({ id:idToUpdate });
        state.forEach((dat) => {
            if(dat.id == idToUpdate) {
                objIdToUpdate = dat.id;
            }
        });

        axios.put('http://localhost:9000/cloth/updateCloth', {
            id: objIdToUpdate,
            name: updateName,
            description: updateMessage });

    };
        return (
            <div>
                <ul>
                    {state.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : state.map((dat) => (
                            <li style={{ padding: '10px' }} key={dat.id}>
                                <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                                <span style={{ color: 'gray' }}> name: </span>
                                {dat.name}
                                <span style={{ color: 'gray' }}> message: </span>
                                {dat.message}
                                <br/>
                                <Button onClick={() => deleteFromDB(dat.id)}>
                                    DELETE
                                </Button>
                            </li>
                        ))}
                </ul>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => setState({ idToUpdate: e.target.value })}
                        placeholder="id of item to update here"
                    />
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => setState({ updateName: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => setState({ updateMessage: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() => updateDB(state.idToUpdate, state.updateName, state.updateMessage)}
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        );
}

export default ClothList();
