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