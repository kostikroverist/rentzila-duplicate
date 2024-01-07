import axios, { AxiosResponse } from 'axios';

type ApiResponse<T> = {
    data: T;
};


export const getMethod = async (baseUrl: string) => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error(`GET Request to ${baseUrl} failed:`, error);
        throw error;
    }
}

export const postMethod = async <T>(baseUrl: string, data: T) => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios.post<ApiResponse<T>>(`${baseUrl}`, data);

        const responseData: T = response.data.data;

        console.log('POST Response:', responseData);
    } catch (error) {
        console.error('POST Request Error:', error);
    }
};