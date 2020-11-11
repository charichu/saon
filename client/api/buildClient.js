import axios from 'axios';

const BuildClient = ({req}) => {
    if(typeof window === 'undefined'){
        // Server side
        return axios.create({
            baseURL: 'http://www.saon-beta.xyz/',
            headers: req.headers
        });
    } else {
        // Client Side
        return axios.create({
            baseURL: '/'
        });
    }
};

export default BuildClient;