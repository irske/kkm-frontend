import axios from 'axios';

const coworkerUrl = 'http://localhost:9000/coworker';

export function getCoworkers() {
    return axios.get(coworkerUrl)
        .then((response) => {
            return response.data;
        });
};

export function getCoworker(id) {
    return axios.get(coworkerUrl + '/' + id)
        .then((response) => {
            return response.data;
        });
};

export function createCoworker(idToBeAdded, name, color) {
    return axios.post(coworkerUrl, {
        mitarbeiterID: idToBeAdded,
        name: name,
        color: color,
    });
};

export function deleteCoworker(id) {
    return axios.delete(coworkerUrl + '/' + id, {
        data: {
            mitarbeiterID: id
        },
    });
};

export function updateCoworker(id, name, color) {
    return axios.put(coworkerUrl + '/' + id, {
        name: name,
        color: color,
    });
};