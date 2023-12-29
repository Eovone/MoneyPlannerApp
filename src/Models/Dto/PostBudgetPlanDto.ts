import { BudgetPlanItem } from "../BudgetPlanItem";

export type PostBudgetPlanDto = {   
    budgetPlanItems: BudgetPlanItem[],
    summaryAmount: number, 
}