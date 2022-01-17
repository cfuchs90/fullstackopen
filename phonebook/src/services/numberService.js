import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

function getAllNumbers() {
    return axios.get(baseUrl).then(response =>  response.data );
    
}

export default { getAllNumbers };
