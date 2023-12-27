import axios from "axios";
import { PostUserDto } from "../Models/Dto/PostUserDto";

const localhost = 'https://localhost:7017/api/Auth';

export const postLoginUser = async (postUserDto: PostUserDto) => {
    try {
        return await axios.post(`${localhost}/Login`, postUserDto)
                          .then(response => response.data);
     } catch (error) {
         console.error('Error logging in user:', error);
     }  
}