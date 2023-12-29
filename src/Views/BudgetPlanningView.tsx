import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import BudgetPlanningForm from '../Components/BudgetPlanning/BudgetPlanningForm';
import { BudgetPlanItem } from '../Models/BudgetPlanItem';
import { Button } from 'react-bootstrap';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PostBudgetPlanDto } from '../Models/Dto/PostBudgetPlanDto';
import { BudgetPlan } from '../Models/BudgetPlan';
import { postBudgetPlan } from '../Services/BudgetPlanningService';
import { showAlert } from '../Store/actionCreators';

const BudgetPlanningView: FC = () => {

const isAuthorized = useSelector((state: AppState) => state.isAuthorized);
const userId = useSelector((state: AppState) => state.userId);    
const JWT = useSelector((state: AppState) => state.jwtToken);
const redirect = useNavigate();
const dispatch = useDispatch();

const [budgetPlanList, setBudgetPlanList] = useState<BudgetPlanItem[]>([]);

const calculateSummaryAmount = (list: BudgetPlanItem[]): number => {
    let summaryAmount = 0;

    list.forEach((item) => {
        if (item.isIncome) {
            summaryAmount += item.amount;
        } else {
            summaryAmount -= item.amount;
        }
    });

    return summaryAmount;
};

  useEffect(() => {
    if (isAuthorized === false) {
      redirect('/');
    }
  }, [isAuthorized, redirect]);

  useEffect(() => {
    calculateSummaryAmount(budgetPlanList);
  }, [budgetPlanList]);

const handleClickDelete = (budgetPlanItem: BudgetPlanItem) => {
    const updatedBudgetPlanList = budgetPlanList.filter(item => item !== budgetPlanItem);
    setBudgetPlanList(updatedBudgetPlanList);
};

const handleSaveBudgetPlan = async () => {
    let summaryAmountCalculated = calculateSummaryAmount(budgetPlanList);    

    let postBudgetPlanDto: PostBudgetPlanDto = {
        budgetPlanItems: budgetPlanList,
        summaryAmount: summaryAmountCalculated,
    }
    try {
        const responseBudgetPlan: BudgetPlan = await postBudgetPlan(postBudgetPlanDto, userId, JWT);
        setBudgetPlanList(responseBudgetPlan.budgetPlanItems);
        dispatch(showAlert({ success: true, message: "Din Budgettavla är sparad." })); 
      } catch (error) {        
        dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte spara din Budgettavla." })); 
      }
};

  if (isAuthorized === false) return <></>
  
    return(
      <Container className='mt-5 text-light p-1 rounded-1'>
        <h3 className='text-center mp-green-text mb-3 bg-black rounded-2 p-1'>Ny Inkomst/Utgift</h3>
        <BudgetPlanningForm budgetPlanList={budgetPlanList} setBudgetPlanList={setBudgetPlanList}/>

        {budgetPlanList.length === 0 ? (
            <div className='text-center mt-3 bg-black rounded-2'>
                <p>Du har inget på din budgettavla än, börja planera!</p>
            </div> 
            ) : (
            <div>
                <div className='bg-black mt-2 rounded-2 p-1 text-center'>
                    <h3 className='mp-green-text'>Din Budgettavla</h3>
                    <p>Summa: {calculateSummaryAmount(budgetPlanList)}</p>
                    <Button onClick={handleSaveBudgetPlan}>Spara</Button>
                </div>
                <Row className='darkBackground rounded-2 p-1 text-center'>
                    <Col className='border-end'>
                        {budgetPlanList
                        .filter((budgetPlanItem) => budgetPlanItem.isIncome)
                        .map((budgetPlanItem, index) => (
                        <div key={index} className='text-light text-center p-1 rounded-2 '>
                            <div className='d-flex justify-content-around align-items-center mb-2'>                    
                            <h5 className='fw-bold bg-black rounded-2 p-1'>{budgetPlanItem.title}</h5>
                            <Button variant='danger' onClick={() => handleClickDelete(budgetPlanItem)} aria-label='delete budgetplanitem'>
                            <DeleteForeverIcon />
                            </Button>
                            </div>                
                            <div className='d-flex justify-content-around'>
                            <p className='bg-black rounded-2 p-1 mp-green-text'>+{budgetPlanItem.amount} kr</p>
                            <p className='bg-black rounded-2 p-1'>Återkommande: {budgetPlanItem.reOccuring ? "Ja" : "Nej"}</p>
                            </div>
                            <hr />                    
                        </div>                  
                        ))}
                    </Col>                    

                    <Col className='border-start'>
                    {budgetPlanList
                        .filter((budgetPlanItem) => !budgetPlanItem.isIncome)
                        .map((budgetPlanItem, index) => (
                        <div key={index} className='text-light text-center p-1 rounded-2'>
                            <div className='d-flex justify-content-around align-items-center mb-2'>                    
                            <h5 className='fw-bold bg-black rounded-2 p-1'>{budgetPlanItem.title}</h5>
                            <Button variant='danger' onClick={() => handleClickDelete(budgetPlanItem)} aria-label='delete budgetplanitem'>
                            <DeleteForeverIcon />
                            </Button>
                            </div>                
                            <div className='d-flex justify-content-around'>
                            <p className='bg-black rounded-2 p-1 text-danger'>-{budgetPlanItem.amount} kr</p>
                            <p className='bg-black rounded-2 p-1'>Återkommande: {budgetPlanItem.reOccuring ? "Ja" : "Nej"}</p>
                            </div> 
                            <hr />                   
                        </div>                  
                        ))}
                    </Col>
                </Row>
                
            </div>
            )} 
      </Container>     
    )    
}
  
export default BudgetPlanningView;