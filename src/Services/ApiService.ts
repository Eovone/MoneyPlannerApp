import axios from 'axios';
const localhost = 'https://localhost:7017/api';

export const postUser = async (userName: string) => {
    try {
        console.log("request url: "+`${localhost}/User`)
        const response = await axios.post(`${localhost}/User`, { userName });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
    }    
}