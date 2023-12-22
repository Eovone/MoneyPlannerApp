import axios from "axios";
import { PostIncomeDto } from "../Models/Dto/PostIncomeDto";

const localhost = 'https://localhost:7017/api/Income';

export const postIncome = async (postIncomeDto: PostIncomeDto, userId: number) => {    
    try {
        return await axios.post(`${localhost}/${userId}`, postIncomeDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error posting income:', error);
     }  
}

export const getIncomes = async (userId: number) => {    
    try {
        return await axios.get(`${localhost}/User/${userId}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting incomes:', error);
     }  
}

export const updateIncome = async (postIncomeDto: PostIncomeDto, incomeId: number) => {    
    try {
        return await axios.put(`${localhost}/${incomeId}`, postIncomeDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error updating income:', error);
     }  
}

export const deleteIncome = async (id: number) => {    
    try {
        return await axios.delete(`${localhost}/${id}`)
                          .then(response => response.status);
     } catch (error) {
         console.error('Error deleting income:', error);
     }  
}

export const getIncomesByMonth = async (userId: number, year: number, monthNumber: number) => {    
    try {
        return await axios.get(`${localhost}/User/${userId}/Year/${year}/Month/${monthNumber}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting incomes:', error);
     }  
}