import axios from "axios";
import { PostExpenseDto } from "../Models/Dto/PostExpenseDto";

const localhost = 'https://localhost:7017/api/Expense';

export const postExpense = async (postExpenseDto: PostExpenseDto, userId: number, jwt: string) => {    
    try {
        const response = await axios.post(
            `${localhost}/${userId}`,
            postExpenseDto,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error posting expense:', error);
    }  
};

export const getExpenses = async (userId: number, jwt: string) => {    
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
        console.error('Error getting expenses:', error);
    }  
};

export const updateExpense = async (postExpenseDto: PostExpenseDto, expenseId: number, jwt: string) => {    
    try {
        const response = await axios.put(
            `${localhost}/${expenseId}`,
            postExpenseDto,
            {
                headers: {
                    Authorization: `bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error updating expense:', error);
    }  
};

export const deleteExpense = async (id: number, jwt: string) => {    
    try {
        const response = await axios.delete(`${localhost}/${id}`, {
            headers: {
                Authorization: `bearer ${jwt}`, 
            },
        });

        return response.status;
    } catch (error) {
        console.error('Error deleting expense:', error);
    }  
};

export const getExpensesByMonth = async (userId: number, year: number, monthNumber: number, jwt: string) => {    
    try {
        const response = await axios.get(`${localhost}/User/${userId}/Year/${year}/Month/${monthNumber}`, {
            headers: {
                Authorization: `bearer ${jwt}`, 
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting expenses:', error);
    }  
};