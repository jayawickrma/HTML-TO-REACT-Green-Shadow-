import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiCall {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3000/api/v1",
        });
    }

    private getAuthHeaders(): Record<string, string> {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`
        };
    }

    async postApiCallWithFormData<T>(url: string, data: FormData): Promise<AxiosResponse<T>> {
        try {
            return await this.api.post<T>(url, data, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("POST with FormData failed:", err);
            throw err;
        }
    }

    async patchApiCallWithFormData<T>(url: string, data: FormData): Promise<AxiosResponse<T>> {
        try {
            return await this.api.patch<T>(url, data, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("PATCH with FormData failed:", err);
            throw err;
        }
    }

    async postApiCall<T>(url: string, data: T): Promise<AxiosResponse<T>> {
        try {
            return await this.api.post<T>(url, data, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("POST request failed:", err);
            throw err;
        }
    }

    async patchApiCall<T>(url: string, data: T): Promise<AxiosResponse<T>> {
        try {
            return await this.api.patch<T>(url, data, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("PATCH request failed:", err);
            throw err;
        }
    }

    async deleteApiCall<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            return await this.api.delete<T>(url, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("DELETE request failed:", err);
            throw err;
        }
    }

    async getApiCall<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            return await this.api.get<T>(url, { headers: this.getAuthHeaders() });
        } catch (err) {
            console.error("GET request failed:", err);
            throw err;
        }
    }
}

const Api_call = new ApiCall();
export default Api_call;
