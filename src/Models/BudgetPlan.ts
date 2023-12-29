import { BudgetPlanItem } from "./BudgetPlanItem";

export type BudgetPlan = {   
    id: number,
    userId: number,
    budgetPlanItems: BudgetPlanItem[],
    summaryAmount: number,   
}