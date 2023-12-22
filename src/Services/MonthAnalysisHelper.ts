import { MonthAnalysis } from "../Models/MonthAnalysis";

interface ChartData {
    date: string;
    Summa: number;
    Inkomst?: number;
    Utgift?: number;
  }
  
  export interface AnalysisSummary {
    chartData: ChartData[];
    largestExpenseTitle: string;
    largestExpense: number;
    largestIncomeTitle: string;
    largestIncome: number;
  }
  
  export const generateChartData = (
    currentDate: Date,
    currentMonthAnalysis?: MonthAnalysis
  ): AnalysisSummary => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const chartData: ChartData[] = [];
    let cumulativeTotal = 0;
    let largestExpense: number = 0;
    let largestExpenseTitle: string = '';
    let largestIncome: number = 0;
    let largestIncomeTitle: string = '';
  
    for (let index = 1; index < daysInMonth + 1; index++) {
      let chartItem: ChartData = {
        date: '',
        Summa: cumulativeTotal,
      };
  
      chartItem.date = index.toString();
  
      currentMonthAnalysis?.incomes.forEach(income => {
        let incomeDate = new Date(income.date);
        if (incomeDate.getDate() === index) {
          if (chartItem.Inkomst !== undefined) {
            chartItem.Inkomst = chartItem.Inkomst + income.amount;
            chartItem.Summa = chartItem.Summa + income.amount;
          } else {
            chartItem.Inkomst = income.amount;
            chartItem.Summa = chartItem.Summa + income.amount;
          }
  
          if (income.amount > largestIncome) {
            largestIncome = income.amount;
            largestIncomeTitle = income.title;
          }
        }
      });
  
      currentMonthAnalysis?.expenses.forEach(expense => {
        let expenseDate = new Date(expense.date);
        if (expenseDate.getDate() === index) {
          if (chartItem.Utgift !== undefined) {
            chartItem.Utgift = chartItem.Utgift + expense.amount;
            chartItem.Summa = chartItem.Summa + expense.amount;
          } else {
            chartItem.Utgift = expense.amount;
            chartItem.Summa = chartItem.Summa - expense.amount;
          }
  
          if (expense.amount > largestExpense) {
            largestExpense = expense.amount;
            largestExpenseTitle = expense.title;
          }
        }
      });
  
      cumulativeTotal = chartItem.Summa;
      chartData.push(chartItem);
    }
  
    return {
      chartData,
      largestExpenseTitle,
      largestExpense,
      largestIncomeTitle,
      largestIncome,
    };
  };