
// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

class MitarbeiterApi extends Component {
    // initialize our state
    state = {
        mitarbeiter: [],
        mitarbeiterID: 0,
        name: null,
        color: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };

    // changed and implement those changes into our UI
    componentDidMount() {
        this.getMitarbeiterFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getMitarbeiterFromDb, 1000);
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
    getMitarbeiterFromDb = () => {
        fetch('http://localhost:9000/mitarbeiter')
            .then((mitarbeiter) => mitarbeiter.json())
            .then((res) => this.setState({ mitarbeiter: res.mitarbeiter }));
    };


    // to create new query into our data base
    postMitarbeiterToDB = (name, color) => {
        let currentIds = this.state.mitarbeiter.map((mitarbeiter) => mitarbeiter.mitarbeiterID);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
        axios.post('http://localhost:9000/mitarbeiter', {
            mitarbeiterID: idToBeAdded,
            name:name,
            color: color,
        });
    };

    // to remove existing database information
    deleteFromDB = (idToDelete) => {
        parseInt(idToDelete);
        let objIdToDelete = null;
        this.setState({ mitarbeiterID:idToDelete });
        this.state.mitarbeiter.forEach((dat) => {
            if (dat.mitarbeiterID === idToDelete) {
                objIdToDelete = dat.mitarbeiterID;
            }
        });
        axios.delete('http://localhost:9000/mitarbeiter/'+ objIdToDelete, {
            data: {
                mitarbeiterID: objIdToDelete
            },
        });

    };

    // to overwrite existing data base information
    updateDB = (idToUpdate, updateName, updateColor) => {
        let objIdToUpdate = null;
        let id = parseInt(idToUpdate);
        this.setState({ mitarbeiterID:id });
        this.state.mitarbeiter.forEach((dat) => {
            if(dat.mitarbeiterID === id) {
                objIdToUpdate = dat.mitarbeiterID;
                console.log('found');
            }
        });

        axios.put('http://localhost:9000/mitarbeiter/'+ objIdToUpdate, {
            name: updateName,
            color: updateColor });

    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { mitarbeiter } = this.state;
        return (
            <div>
                <table><tbody>
                    {mitarbeiter.length <= 0
                        ? 'NO DB ENTRIES YET'
                        : mitarbeiter.map((dat) => (
                            <tr style={{ padding: '10px' }} key={dat.mitarbeiterID}>
                                <td>
                                    <span style={{ color: 'gray' }}> id: </span> {dat.mitarbeiterID} </td>
                                <td>
                                <span style={{ color: 'gray' }}> name: </span>
                                    {dat.name}</td>  <td>
                                <span style={{ color: 'gray' }}> color: </span>
                                {dat.color}</td>  <td>
                                <input type="button" onClick={() => this.deleteFromDB(dat.mitarbeiterID)} value="Delete" /></td>
                            </tr>
                        ))}</tbody>
                </table>

                <div style={{ padding: '10px' }}>
                    <input
                        label="Name"
                        type="text"
                        onChange={(e) => this.setState({ name: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: '200px' }}
                    />
                    <input
                        label="Color"
                        type="number"
                        onChange={(e) => this.setState({ color: e.target.value })}
                        placeholder="add something in the database"
                        style={{ width: '200px' }}
                    />
                    <input type="button" onClick={() => this.postMitarbeiterToDB(this.state.name, this.state.color)} value="add">
                    </input>
                </div>
                <div style={{ padding: '10px' }}>
                    <input
                        type="number"
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
                        type="number"
                        style={{ width: '200px' }}
                        onChange={(e) => this.setState({ updateColor: e.target.value })}
                        placeholder="put new value of the item here"
                    />
                    <input type="button" value="Update"
                        onClick={() =>
                            this.updateDB(this.state.idToUpdate, this.state.updateName, this.state.updateColor)
                        }
                    />
                </div>
            </div>
        );
    }
}

export default MitarbeiterApi;
