import { BudgetPlanItem } from "../BudgetPlanItem";

export type PostBudgetPlanDto = {   
    budgetPlanItemsDto: BudgetPlanItem[],
    summaryAmount: number, 
}