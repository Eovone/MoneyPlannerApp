import axios from 'axios';
import { PostUserDto } from '../Models/Dto/PostUserDto';
import { PostIncomeDto } from '../Models/Dto/PostIncomeDto';
import { PostExpenseDto } from '../Models/Dto/PostExpenseDto';
import { PostMonthAnalysisDto } from '../Models/Dto/PostMonthAnalysisDto';
const localhost = 'https://localhost:7017/api';

export const postUser = async (postUserDto: PostUserDto) => {
    try {
       return await axios.post(`${localhost}/User`, postUserDto)
                         .then(response => response.data);
    } catch (error) {
        console.error('Error creating user:', error);
    }    
}
 
export const postLoginUser = async (postUserDto: PostUserDto) => {
    try {
        return await axios.post(`${localhost}/User/Login`, postUserDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error logging in user:', error);
     }  
}

export const postIncome = async (postIncomeDto: PostIncomeDto, userId: number) => {    
    try {
        return await axios.post(`${localhost}/Income/${userId}`, postIncomeDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error posting income:', error);
     }  
}

export const getIncomes = async (userId: number) => {    
    try {
        return await axios.get(`${localhost}/Income/User/${userId}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting incomes:', error);
     }  
}

export const updateIncome = async (postIncomeDto: PostIncomeDto, incomeId: number) => {    
    try {
        return await axios.put(`${localhost}/Income/${incomeId}`, postIncomeDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error updating income:', error);
     }  
}

export const deleteIncome = async (id: number) => {    
    try {
        return await axios.delete(`${localhost}/Income/${id}`)
                          .then(response => response.status);
     } catch (error) {
         console.error('Error deleting income:', error);
     }  
}

export const postExpense = async (postExpenseDto: PostExpenseDto, userId: number) => {    
    try {
        return await axios.post(`${localhost}/Expense/${userId}`, postExpenseDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error posting expense:', error);
     }  
}

export const getExpenses = async (userId: number) => {    
    try {
        return await axios.get(`${localhost}/Expense/User/${userId}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting expenses:', error);
     }  
}

export const updateExpense = async (postExpenseDto: PostExpenseDto, expenseId: number) => {    
    try {
        return await axios.put(`${localhost}/Expense/${expenseId}`, postExpenseDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error updating expense:', error);
     }  
}

export const deleteExpense = async (id: number) => {    
    try {
        return await axios.delete(`${localhost}/Expense/${id}`)
                          .then(response => response.status);
     } catch (error) {
         console.error('Error deleting expense:', error);
     }  
}

export const postMonthAnalysis = async (postMonthAnalysisDto: PostMonthAnalysisDto, userId: number) => {
    try {
        return await axios.post(`${localhost}/Analysis/${userId}`, postMonthAnalysisDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error posting MonthAnalysis:', error);
     }  
}

export const getMonthAnalysis = async (postMonthAnalysisDto: PostMonthAnalysisDto, userId: number) => {    
    try {
        return await axios.get(`${localhost}/Analysis/User/${userId}/Year/${postMonthAnalysisDto.year}/Month/${postMonthAnalysisDto.month}`)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error getting MonthAnalysis:', error);
     }  
}