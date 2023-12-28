import { FC, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import { PostMonthAnalysisDto } from '../Models/Dto/PostMonthAnalysisDto';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { showAlert } from '../Store/actionCreators';
import { MonthAnalysis } from '../Models/MonthAnalysis';
import { postMonthAnalysis, getMonthAnalysis } from '../Services/MonthAnalysisService';
import MonthSelector from '../Components/MonthSelector';
import { AnalysisSummary, generateChartData } from '../Services/MonthAnalysisHelper';
import LineChartGraph from '../Components/MonthAnalysis/LineChartGraph';
import BarChartGraph from '../Components/MonthAnalysis/BarChartGraph';

const MonthAnalysisView: FC = () => { 
    
const dispatch = useDispatch();
const userId = useSelector((state: AppState) => state.userId);
const JWT = useSelector((state: AppState) => state.jwtToken);

const [currentDate, setCurrentDate] = useState(new Date());
const [currentMonthAnalysis, setCurrentMonthAnalysis] = useState<MonthAnalysis | null>(null);

useEffect(() => {
    let postMonthAnalysisDto: PostMonthAnalysisDto ={
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear(),
    }
    const fetchMonthAnalysis = async () => {        
        let responseMonthAnalysis = await getMonthAnalysis(postMonthAnalysisDto, userId, JWT);

        if (responseMonthAnalysis === 404) {
            setCurrentMonthAnalysis(null);
        }
        else if (responseMonthAnalysis && typeof responseMonthAnalysis === 'object'){           
            setCurrentMonthAnalysis(responseMonthAnalysis);
        }
        else {
            dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta din Månadsanalys." }));
            setCurrentMonthAnalysis(null);
        }        
      };  

      fetchMonthAnalysis();
}, [currentDate]);

const handleGenerateMonthAnalysis = async () => {
    let postMonthAnalysisDto: PostMonthAnalysisDto ={
        month: currentDate.getMonth()+1,
        year: currentDate.getFullYear(),
    }
    try {   
        let responseMonthAnalysis : MonthAnalysis = await postMonthAnalysis(postMonthAnalysisDto, userId, JWT);
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


let analysisSummary: AnalysisSummary = {
    chartData: [],
    largestExpenseTitle: '',
    largestExpense: 0,
    largestIncomeTitle: '',
    largestIncome: 0,
  };

  if (currentMonthAnalysis) {
    analysisSummary = generateChartData(currentDate, currentMonthAnalysis);
  }
  
const { chartData, largestExpenseTitle, largestExpense, largestIncomeTitle, largestIncome } = analysisSummary;

const lastTotal = chartData.length > 0 ? chartData[chartData.length - 1].Summa : 0;
const strokeColor = lastTotal > 0 ? 'green' : 'red';

    return (
        <Container>
         
          <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate}/>    

                {currentMonthAnalysis === null ? (
                    <>
                        <Row>
                            <Col className='text-center mt-3'>
                                <Button onClick={handleGenerateMonthAnalysis}>
                                    Generera Månadsanalys
                                </Button>
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col className='text-center d-flex justify-content-center'>
                                <p className='text-light bg-black rounded-2 p-1'>
                                    Det finns ingen månadsanalys för {currentDate.toLocaleString('default', { month: 'long' })} än.
                                </p>
                            </Col>
                        </Row>
                    </>
                    ) : (
                        <>
                        <Row>
                            <Col className='text-center mt-3'>
                                <Button onClick={handleGenerateMonthAnalysis}>
                                    Uppdatera Månadsanalys
                                </Button>
                            </Col>
                        </Row>
                        <Row className='text-light text-center mt-3 bg-dark rounded-1 '>
                            <Col>
                                <h4 className='mp-green-text bg-black rounded-2 p-1'>Sammanfattning</h4>
                                <p>
                                    Summa för månaden: 
                                    <span style={{ color: strokeColor }}> {lastTotal} kr</span>
                                </p>
                                <hr/>
                                <p>
                                    Största Utgift: {largestExpenseTitle} 
                                    <span style={{ color: "red" }}> -{largestExpense} kr</span>
                                </p>
                                <hr/>
                                <p>
                                    Högsta Inkomst: {largestIncomeTitle} 
                                    <span style={{ color: "green" }}> +{largestIncome} kr</span>
                                </p>
                                
                            </Col>
                        </Row>
                        
                        <LineChartGraph chartData={chartData}
                                        strokeColor={strokeColor}/>                         

                        <BarChartGraph chartData={chartData}/>  
                        </>
                    )}   
        </Container>
      );
    };
  
  export default MonthAnalysisView;