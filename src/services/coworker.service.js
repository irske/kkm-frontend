import axios from 'axios';

const coworkerUrl = 'http://localhost:9000/mitarbeiter';

export function getCoworker() {
    return axios.get(coworkerUrl);
    // .then((mitarbeiter) => mitarbeiter.json());
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