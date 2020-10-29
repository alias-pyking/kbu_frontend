import axios from 'axios';

const instance = axios.create({
    baseURL:'https://keepborrowuse.herokuapp.com/',
})

export default instance;