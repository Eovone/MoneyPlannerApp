import { Expense } from "./Expense";
import { Income } from "./Income";

export type MonthAnalysis = {   
    id: number,
    userId: number,
    incomes: Income[],
    expenses: Expense[],
    summaryAmount: number,
    year: number,
    month: number,
}