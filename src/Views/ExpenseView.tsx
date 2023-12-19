import { FC, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ExpenseBudgetForm from '../Components/ExpenseBudgetForm';
import { Expense } from '../Models/Expense';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { getExpenses } from '../Services/ApiService';
import { showAlert } from '../Store/actionCreators';

const ExpenseView: FC = () => {  

  const dispatch = useDispatch();
  const userId = useSelector((state: AppState) => state.userId);

  const [listOfExpenses, setListOfExpenses] = useState<Expense[]>([]);  

  const fetchExpenses = async () => {
    try {
      const responseList: Expense[] = await getExpenses(userId);
      setListOfExpenses(responseList);
    } catch (error) {        
      dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta dina Utgifter." })); 
    }
  }; 
  
  useEffect(() => {    
    fetchExpenses();
  }, [userId, dispatch]);

  const getFormattedDay = (date: Date) => {
    const day = new Date(date).getDate();
    const suffix = (day === 1 || day === 2 || day === 21 || day === 31) ? 'a' : 'e';
    return `${day}${suffix}`;
  };

    return(
      <Container className='darkBackground mt-5'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Utgifter</h1>
          </Col>
        </Row>

        <Row>
          <Col>
          <div>
              <h4 className='text-center mp-green-text'>Månadsvis</h4>
              {listOfExpenses
                .filter((expense) => expense.reOccuring)
                .map((expense) => (
                  <div key={expense.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    {/* <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button> */}
                    <p className='fw-bold'>{expense.title}</p>
                    {/* <Button variant='danger' onClick={() => handleClickDelete(income)}>
                      <DeleteForeverIcon />
                    </Button> */}
                    </div>                
                    <div className='d-flex justify-content-around'>
                      <p className='mp-darkgreen-bg rounded-1 p-1 text-danger'>-{expense.amount} kr</p>
                      <p>När: {getFormattedDay(expense.date)}</p>
                    </div>                    
                    <hr />
                  </div>                  
                ))}
            </div>            

            <div>
              <h4 className='text-center mp-green-text'>Övriga inkomster</h4>
              {listOfExpenses
                .filter((expense) => !expense.reOccuring)
                .map((expense) => (
                  <div key={expense.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    {/* <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button> */}
                    <p className='fw-bold'>{expense.title}</p>
                    {/* <Button variant='danger' onClick={() => handleClickDelete(income)}>
                      <DeleteForeverIcon />
                    </Button> */}
                    </div>
                    <div className='d-flex justify-content-around'>
                      <p className='mp-darkgreen-bg rounded-1 p-1 text-danger'>-{expense.amount} kr</p>
                      <p>{new Date(expense.date).toLocaleDateString()}</p>
                    </div>                    
                    <hr />
                  </div>
                ))}
            </div>
          </Col>

          <Col>
            <h3 className='text-center mp-green-text mb-3'>Ny Utgift</h3>
            <ExpenseBudgetForm fetchExpenses={fetchExpenses}/>
          </Col>  
        </Row>
      </Container>     
    )    
}
  
  export default ExpenseView;