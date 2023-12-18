import axios from 'axios';
import { PostUserDto } from '../Models/Dto/PostUserDto';
import { PostIncomeDto } from '../Models/Dto/PostIncomeDto';
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