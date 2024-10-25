// src/services/AxiosService.js
import axios from 'axios';
const config = require('../configrations/Configration');// Corrected path to your configuration



export default class AxiosService {
    constructor() {
        this.api = axios.create({
            baseURL: config.createURL, // Set your base URL from the config
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.api1 = axios.create({
            baseURL: config.combineURL, // Set your base URL from the config
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.api2 = axios.create({
            baseURL: config.evluteURL, // Set your base URL from the config
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.api3 = axios.create({
            baseURL: config.updateURL, // Set your base URL from the config
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
    async post(url, data) {
        try {
            const response = await this.api.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error.message}`);
        }
    }
    async post1(url, data) {
        try {
            const response = await this.api1.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error.message}`);
        }
    }
    async post2(url, data) {
        try {
            const response = await this.api2.post(url, data);
            return response.data;
        } catch (error) {
            throw new Error(`POST request failed: ${error.message}`);
        }
    }

    // Method to handle GET requests
    // get(url) {
    //     return this.api.get(url);
    // }

    // // Method to handle POST requests
    // post(url, data) {
    //     return this.api.post(url, data);
    // }

    // // Method to handle PUT requests
    async put(url, data) {
        try {
            const response = await this.api3.put(url, data);
            return response.data;
        } catch (error) {
            throw new Error(`PUT request failed: ${error.message}`);
        }
    }

    // // Method to handle DELETE requests
    // delete(url) {
    //     return this.api.delete(url);
    // }
}
