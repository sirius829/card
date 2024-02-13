import axios from "axios";

const Axios = axios.create({
    baseURL: 'https://api.magicthegathering.io/v1'
});

interface Param {
    pageSize: number;
    page: number;
    name?: string;
}

export const fetchData = async (param: Param) => {

    try {
        const result = await Axios.get(`/cards`, {
            params: param
        });
        return {
            status: result.status,
            data: result.data,
            totalCount: result.headers['total-count']
        };
    } catch (error: any) {
        console.log(error);
        return {
            status: 500,
            msg: error.message
        };
    }
    
}