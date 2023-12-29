import { BudgetPlanItem } from "./BudgetPlanItem";

export type BudgetPlan = {   
    id: number,
    userId: number,
    budgetPlanItemsDto: BudgetPlanItem[],
    summaryAmount: number,   
}