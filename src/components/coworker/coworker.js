
// /client/App.js
import React, { Component } from 'react';
import * as coworkerService from '../../services/coworker.service';

class Coworker extends Component {
    // initialize our state
    state = {
        coworker: [],
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
        this.initCoworker();
        // if (!this.state.intervalIsSet) {
        //     let interval = setInterval(this.initCoworker, 1000);
        //     this.setState({ intervalIsSet: interval });
        // }
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
    initCoworker = () => {
        coworkerService.getCoworkers()
            .then((coworkers) => {
                return this.setState({ coworker: coworkers });
            });
            // .then((res) => this.setState({ coworker: res.coworker }));
    };


    // to create new query into our data base
    createCoworker = (name, color) => {
        let currentIds = this.state.coworker.map((coworker) => coworker.mitarbeiterID);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        coworkerService.createCoworker(idToBeAdded, name, color);
    };

    // to remove existing database information
    deleteCoworker = (idToDelete) => {
        parseInt(idToDelete);
        let objIdToDelete = null;
        this.setState({ mitarbeiterID:idToDelete });
        this.state.coworker.forEach((dat) => {
            if (dat.mitarbeiterID === idToDelete) {
                objIdToDelete = dat.mitarbeiterID;
            }
        });

        coworkerService.deleteCoworker(objIdToDelete);
    };

    // to overwrite existing data base information
    updateCoworker = (idToUpdate, updateName, updateColor) => {
        let objIdToUpdate = null;
        let id = parseInt(idToUpdate);
        this.setState({ mitarbeiterID: id });
        this.state.coworker.forEach((dat) => {
            if(dat.mitarbeiterID === id) {
                objIdToUpdate = dat.mitarbeiterID;
                console.log('found');
            }
        });

        coworkerService.updateCoworker(objIdToUpdate, updateName, updateColor);
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        const { coworker } = this.state;
        return (
            <div>
                <table>
                    <tbody>{coworker.length <= 0 ? 'NO DB ENTRIES YET' : coworker.map((dat) => (
                        <tr style={{ padding: '10px' }} key={dat.mitarbeiterID}><td>
                            <span style={{ color: 'gray' }}> id: </span> {dat.mitarbeiterID}
                        </td><td>
                            <span style={{ color: 'gray' }}> name: </span> {dat.name}
                        </td><td>
                            <span style={{ color: 'gray' }}> color: </span> {dat.color}
                        </td><td>
                            <input type="button" onClick={() => this.deleteCoworker(dat.mitarbeiterID)} value="Delete" />
                        </td></tr>
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
                    <input type="button" onClick={() => this.createCoworker(this.state.name, this.state.color)} value="add">
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
                            this.updateCoworker(this.state.idToUpdate, this.state.updateName, this.state.updateColor)
                        }
                    />
                </div>
            </div>
        );
    }
}

export default Coworker;