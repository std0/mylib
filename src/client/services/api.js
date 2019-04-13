import axios from 'axios';

let reformatErrors = data => {
    if (data.errors === undefined) {
        data.errors = [data.message];
    }
    return data.errors;
};

class ApiError extends Error {
    constructor(responseData) {
        super();
        this.errors = reformatErrors(responseData);
    }
}

export default class ApiService {
    static async sendRequest(promise) {
        try {
            let response = await promise;
            return response.data;
        } catch (e) {
            throw new ApiError(e.response.data);
        }
    }

    static async getMyInfo() {
        let url = '/api/users/me';
        let promise = axios.get(url);
        return await ApiService.sendRequest(promise);
    }

    static async register(userData) {
        let url = '/api/users/register';
        let promise = axios.post(url, userData);
        return await ApiService.sendRequest(promise);
    }

    static async login(userData) {
        let url = '/api/users/login';
        let promise = axios.post(url, userData);
        return await ApiService.sendRequest(promise);
    }

    static async logout() {
        let url = '/api/users/logout';
        let promise = axios.post(url);
        return await ApiService.sendRequest(promise);
    }
}
