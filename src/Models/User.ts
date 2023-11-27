import { Expense } from "./Expense";
import { Income } from "./Income";

export type User = {
    id: number,
    username: string,
    incomes: Income[],
    expenses: Expense[],
}