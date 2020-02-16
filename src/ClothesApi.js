
// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class ClothesApi extends Component {
    // initialize our state
    state = {
        cloth: [],
        id: 0,
        name: null,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };

    // changed and implement those changes into our UI
    componentDidMount() {
        this.getClothFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getClothFromDb, 1000);
            this.setState({ intervalIsSet: interval });
        }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
        if (this.state.intervalIsSet) {
            clearInterval(this.state.intervalIsSet);
            this.setState({ intervalIsSet: null });
        }
    }
    // fetch data from our data base
    getClothFromDb = () => {
        fetch('http://localhost:9000/cloth/getCloth')
            .then((cloth) => cloth.json())
            .then((res) => this.setState({ cloth: res.cloth }));
    };

    // to create new query into our data base
    postClothToDB = (name, message) => {
        let currentIds = this.state.cloth.map((cloth) => cloth.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        axios.post('http://localhost:9000/cloth/postCloth', {
            id: idToBeAdded,
            name:name,
            message: message,
        });
    };

    // to remove existing database information
    deleteFromDB = (idToDelete) => {
        parseInt(idToDelete);
        let objIdToDelete = null;
        this.setState({ id:idToDelete });
        this.state.cloth.forEach((dat) => {
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
    updateDB = (idToUpdate, updateName, updateMessage) => {
        let objIdToUpdate = null;
        parseInt(idToUpdate);
        this.setState({ id:idToUpdate });
        this.state.cloth.forEach((dat) => {
            if(dat.id == idToUpdate) {
                objIdToUpdate = dat.id;
            }
        });

        axios.put('http://localhost:9000/cloth/updateCloth', {
            id: objIdToUpdate,
            name: updateName,
            description: updateMessage });

    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { cloth } = this.state;
        return (
            <div>
                <ul>
                    {cloth.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : cloth.map((dat) => (
                            <li style={{ padding: '10px' }} key={dat.id}>
                                <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                                <span style={{ color: 'gray' }}> name: </span>
                                {dat.name}
                                <span style={{ color: 'gray' }}> message: </span>
                                {dat.message}
                                <br/>
                                <Button onClick={() => this.deleteFromDB(dat.id)}>
                                    DELETE
                                </Button>
                            </li>
                        ))}
                </ul>
                <div style={{ padding: '10px' }}>
                    <input
                        label="Name"
                        type="text"
                        onChange={(e) => this.setState({ name: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: '200px' }}
                    />
                    <input
                        label="Message"
                        type="text"
                        onChange={(e) => this.setState({ message: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: '200px' }}
                    />
                    <button onClick={() => this.postClothToDB(this.state.name, this.state.message)}>
                        ADD
                    </button>
                </div>
                <div style={{ padding: '10px' }}>
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ idToUpdate: e.target.value })}
                        placeholder="id of item to update here"
                    />
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ updateName: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <input
                        type="text"
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ updateMessage: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <button
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateName, this.state.updateMessage)
                        }
                    >
                        UPDATE
                    </button>
                </div>
            </div>
        );
    }
}

export default ClothesApi;
