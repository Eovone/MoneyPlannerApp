import axios from "axios";
import { PostExpenseDto } from "../Models/Dto/PostExpenseDto";

const localhost = 'https://localhost:7017/api/Expense';

export const postExpense = async (postExpenseDto: PostExpenseDto, userId: number) => {    
    try {
        return await axios.post(`${localhost}/${userId}`, postExpenseDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error posting expense:', error);
     }  
}

export const getExpenses = async (userId: number) => {    
    try {
        return await axios.get(`${localhost}/User/${userId}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting expenses:', error);
     }  
}

export const updateExpense = async (postExpenseDto: PostExpenseDto, expenseId: number) => {    
    try {
        return await axios.put(`${localhost}/${expenseId}`, postExpenseDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error updating expense:', error);
     }  
}

export const deleteExpense = async (id: number) => {    
    try {
        return await axios.delete(`${localhost}/${id}`)
                          .then(response => response.status);
     } catch (error) {
         console.error('Error deleting expense:', error);
     }  
}

export const getExpensesByMonth = async (userId: number, year: number, monthNumber: number) => {    
    try {
        return await axios.get(`${localhost}/User/${userId}/Year/${year}/Month/${monthNumber}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting expenses:', error);
     }  
}