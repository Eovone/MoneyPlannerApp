import axios, { AxiosError } from "axios";
import { PostMonthAnalysisDto } from "../Models/Dto/PostMonthAnalysisDto";

const localhost = 'https://localhost:7017/api/Analysis';

export const postMonthAnalysis = async (postMonthAnalysisDto: PostMonthAnalysisDto, userId: number, jwt: string) => {
    try {
        const response = await axios.post(`${localhost}/${userId}`, postMonthAnalysisDto, {
            headers: {
                Authorization: `bearer ${jwt}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error posting MonthAnalysis:', error);       
    }
};

export const getMonthAnalysis = async ( postMonthAnalysisDto: PostMonthAnalysisDto, userId: number, jwt: string ) => {
    try {
        const response = await axios.get(
            `${localhost}/User/${userId}/Year/${postMonthAnalysisDto.year}/Month/${postMonthAnalysisDto.month}`,
            {headers: {
                    Authorization: `bearer ${jwt}`,
                },}
        );

        if (response.status === 200) return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 404) {
                return axiosError.response.status;
            } else {
                console.error('Error getting MonthAnalysis:', error);
                return axiosError.response?.status;
            }
        }
    }
};