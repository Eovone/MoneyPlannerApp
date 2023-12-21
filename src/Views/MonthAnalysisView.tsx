import { FC, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostMonthAnalysisDto } from '../Models/Dto/PostMonthAnalysisDto';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { showAlert } from '../Store/actionCreators';
import { MonthAnalysis } from '../Models/MonthAnalysis';
import { getMonthAnalysis, postMonthAnalysis } from '../Services/ApiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { date } from 'yup';
import { ChartData } from '../Models/ChartData';

const MonthAnalysisView: FC = () => { 
    
const dispatch = useDispatch();
const userId = useSelector((state: AppState) => state.userId);

const [currentDate, setCurrentDate] = useState(new Date());
const [currentMonthAnalysis, setCurrentMonthAnalysis] = useState<MonthAnalysis | null>(null);

useEffect(() => {
    let postMonthAnalysisDto: PostMonthAnalysisDto ={
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear(),
    }
    const fetchMonthAnalysis = async () => {
        try {
          let responseMonthAnalysis: MonthAnalysis = await getMonthAnalysis(postMonthAnalysisDto, userId);
          if (responseMonthAnalysis){
            setCurrentMonthAnalysis(responseMonthAnalysis);

          }
          else {
            setCurrentMonthAnalysis(null);
          }
        } catch (error) {        
          dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta din Månadsanalys." })); 
        }
      };  

      fetchMonthAnalysis();
}, [currentDate]);


const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
};

const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const currentMonthEnd = new Date();
    currentMonthEnd.setDate(1);
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
    currentMonthEnd.setDate(currentMonthEnd.getDate() - 1);

    if (nextMonth <= currentMonthEnd) {
        setCurrentDate(nextMonth);
    }
};

const handleGenerateMonthAnalysis = async () => {
    let postMonthAnalysisDto: PostMonthAnalysisDto ={
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear(),
    }
    try {   
        let responseMonthAnalysis : MonthAnalysis = await postMonthAnalysis(postMonthAnalysisDto, userId);
        if(responseMonthAnalysis){                  
            dispatch(showAlert({ success: true, message: "Månadsanalysen är skapad." }));
            setCurrentMonthAnalysis(responseMonthAnalysis);
        }
        else {
            dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));
        }
    } catch (error) {
        dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));               
    }
}

const currentMonthEnd = new Date();
currentMonthEnd.setDate(1);
currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
currentMonthEnd.setDate(currentMonthEnd.getDate() - 1);

const month = currentDate.toLocaleString('default', { month: 'long' });
const year = currentDate.getFullYear();

const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

const chartData: ChartData[] = [];
let cumulativeTotal = 0;
let largestExpense: number = 0;
let largestExpenseTitle: string = '';
let largestIncome: number = 0;
let largestIncomeTitle: string = '';


for (let index = 1; index < daysInMonth+1; index++) {   
    let chartItem: ChartData = {
        date: '',
        Summa: cumulativeTotal,
    };

    chartItem.date = index.toString();   

    currentMonthAnalysis?.incomes.forEach(income => {
        let incomeDate = new Date(income.date);
        if (incomeDate.getDate() === index){
            chartItem.Inkomst = income.amount;
            chartItem.Summa = (chartItem.Summa + income.amount);   
            
            if(income.amount > largestIncome){
                largestIncome = income.amount;
                largestIncomeTitle = income.title;
            }
        }
        
    });
    currentMonthAnalysis?.expenses.forEach(expense => {
        let expenseDate = new Date(expense.date);
        if (expenseDate.getDate() === index){
            chartItem.Utgift = expense.amount;    
            chartItem.Summa = (chartItem.Summa - expense.amount); 

            if (expense.amount > largestExpense){
                largestExpense = expense.amount;
                largestExpenseTitle = expense.title;
            }   
    }});

    cumulativeTotal = chartItem.Summa;
    chartData.push(chartItem);    
}

const lastTotal = chartData.length > 0 ? chartData[chartData.length - 1].Summa : 0;
const strokeColor = lastTotal > 0 ? 'green' : 'red';

console.log(chartData)

    return (
        <Container>
          <Row className='text-light'>
            <Col className='d-flex justify-content-end'>
                <Button onClick={handlePrevMonth}><ArrowBackIcon/></Button>
            </Col>
            <Col className='text-center'>
                <h4>{year}</h4>
                <h2>{month.toUpperCase()}</h2>
            </Col>
            <Col className='d-flex justify-content-start'>
                <Button onClick={handleNextMonth}><ArrowForwardIcon/></Button>
            </Col>  
          </Row>

          <Row>
            <Col className='text-center mt-3'>
                <Button onClick={handleGenerateMonthAnalysis}>
                    Generera Månadsanalys
                </Button>
            </Col>
          </Row>

          
                {currentMonthAnalysis === null ? (
                    <Row className='mt-3'>
                        <Col className='text-center d-flex justify-content-center'>
                            <p className='text-light'>
                                Det finns ingen månadsanalys för {currentDate.toLocaleString('default', { month: 'long' })} än.
                            </p>
                        </Col>
                    </Row>
                    ) : (
                        <>
                        <Row className='text-light text-center mt-3 bg-dark rounded-1 '>
                            <Col>
                                <h5>Sammanfattning</h5>
                                <p>Största Utgift: {largestExpenseTitle} | -{largestExpense} kr</p>
                                <p>Högsta Inkomst: {largestIncomeTitle} | +{largestIncome} kr</p>
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col className='text-center d-flex justify-content-center'>
                                <LineChart width={1000}
                                            height={400}
                                            data={chartData}
                                            margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                            }}
                                            className='bg-dark rounded-1'
                                            >
                                    <XAxis dataKey="date" stroke='white' />
                                    <YAxis stroke='white'/>
                                    <Tooltip labelFormatter={(label: string) => `Datum: ${label}`} />
                                    <Legend />
                                    <Line type="monotone" dataKey="Summa" stroke={strokeColor} strokeWidth={3} r={0}/>                                                            
                                </LineChart>
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col className='text-center d-flex justify-content-center'>
                                <BarChart width={1000}
                                            height={400}
                                            data={chartData}
                                            margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                            }}
                                            className='bg-dark rounded-1'
                                            >
                                    <XAxis dataKey="date" stroke='white' />
                                    <YAxis stroke='white'/>
                                    <Tooltip labelFormatter={(label: string) => `Datum: ${label}`}/>
                                    <Legend />
                                    <Bar dataKey="Inkomst" fill='green' />
                                    <Bar dataKey="Utgift" fill='red' />
                                
                                </BarChart>
                            </Col>
                            </Row>
                             </>
                    )}   
        </Container>
      );
    };
  
  export default MonthAnalysisView;