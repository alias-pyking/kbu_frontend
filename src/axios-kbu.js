import axios from 'axios';

const instance = axios.create({
    baseURL:'https://keepborrowuser.herokuapp.com',
})

export default instance;