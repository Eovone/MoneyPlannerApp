import axios from "axios";
import { PostIncomeDto } from "../Models/Dto/PostIncomeDto";

const localhost = 'https://localhost:7017/api/Income';

export const postIncome = async (postIncomeDto: PostIncomeDto, userId: number, jwt: string) => {
    try {
        const response = await axios.post(
            `${localhost}/${userId}`,
            postIncomeDto,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error posting income:', error);
    }
};

export const getIncomes = async (userId: number, jwt: string) => {
    try {
        const response = await axios.get(
            `${localhost}/User/${userId}`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`, 
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error getting incomes:', error);
    }
};

export const updateIncome = async (postIncomeDto: PostIncomeDto, incomeId: number, jwt: string) => {
    try {
        const response = await axios.put(
            `${localhost}/${incomeId}`,
            postIncomeDto,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating income:', error);
    }
};

export const deleteIncome = async (id: number, jwt: string) => {
    try {
        const response = await axios.delete(
            `${localhost}/${id}`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`, 
                },
            }
        );

        return response.status;
    } catch (error) {
        console.error('Error deleting income:', error);
    }
};

export const getIncomesByMonth = async (userId: number, year: number, monthNumber: number, jwt: string) => {
    try {
        const response = await axios.get(
            `${localhost}/User/${userId}/Year/${year}/Month/${monthNumber}`,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error getting incomes:', error);
    }
};