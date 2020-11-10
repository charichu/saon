import axios from 'axios';

const BuildClient = ({req}) => {
    if(typeof window === 'undefined'){
        // Server side
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
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