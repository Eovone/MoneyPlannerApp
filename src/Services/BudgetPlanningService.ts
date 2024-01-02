import axios from "axios";
import { PostBudgetPlanDto } from "../Models/Dto/PostBudgetPlanDto";

const localhost = 'https://localhost:7017/api/BudgetPlanning';

export const postBudgetPlan = async (postBudgetPlanDto: PostBudgetPlanDto, userId: number, jwt: string) => {
    try {
        const response =  await axios.post(`${localhost}/${userId}`, 
                                postBudgetPlanDto,
                                {
                                    headers: {
                                        Authorization: `bearer ${jwt}`,
                                    },
                                }
                          );
        return response.data;
     } catch (error) {
         console.error('Error creating budgetplan:', error);
     }  
};

export const getUserBudgetPlan = async (userId: number, jwt: string) => {
    try {
        const response =  await axios.get(`${localhost}/User/${userId}`,
                                {
                                    headers: {
                                        Authorization: `bearer ${jwt}`,
                                    },
                                }
                          );
        return response.data;
     } catch (error) {
         console.error('Error getting budgetplan:', error);
     }  
};