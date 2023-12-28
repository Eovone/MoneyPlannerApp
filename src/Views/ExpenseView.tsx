import { FC, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ExpenseBudgetForm from '../Components/Expense/ExpenseBudgetForm';
import { Expense } from '../Models/Expense';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { updateExpense, deleteExpense, getExpensesByMonth } from '../Services/ExpenseService';
import { showAlert } from '../Store/actionCreators';
import { PostExpenseDto } from '../Models/Dto/PostExpenseDto';
import { Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExpenseEditModal from '../Components/Expense/ExpenseEditModal';
import ExpenseDeleteModal from '../Components/Expense/ExpenseDeleteModal';
import MonthSelector from '../Components/MonthSelector';
import { useNavigate } from 'react-router-dom';

const ExpenseView: FC = () => {  

  const redirect = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: AppState) => state.userId);
  const JWT = useSelector((state: AppState) => state.jwtToken);
  const isAuthorized = useSelector((state: AppState) => state.isAuthorized);

  const [listOfExpenses, setListOfExpenses] = useState<Expense[]>([]);  
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (isAuthorized === false) {
      redirect('/');
    }
  }, [isAuthorized, redirect]);

  const fetchExpenses = async () => {
    try {
      const responseList: Expense[] = await getExpensesByMonth(userId, currentDate.getFullYear(), currentDate.getMonth()+1, JWT);
      setListOfExpenses(responseList);
    } catch (error) {        
      dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta dina Utgifter." })); 
    }
  }; 
  
  useEffect(() => {    
    fetchExpenses();
  }, [userId, dispatch, currentDate]);

  const getFormattedDay = (date: Date) => {
    const day = new Date(date).getDate();
    const suffix = (day === 1 || day === 2 || day === 21 || day === 31) ? 'a' : 'e';
    return `${day}${suffix}`;
  };

  const handleEdit = (expense: Expense) => {  
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const handleClose = () => {
    setShowEditModal(false);
    setSelectedExpense(null);
  };

  const handleClickDelete = (expense: Expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const handleDelete = async (expenseId: number) => {
    setShowDeleteModal(false);
    try {
      let responseStatus = await deleteExpense(expenseId, JWT);
      if (responseStatus === 204) {
        dispatch(showAlert({ success: true, message: "Din Utgift är borttagen." }));
        setListOfExpenses(prevState => prevState.filter(expense => expense.id !== expenseId));
      }
      else {
        dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));  
      }
    } catch {
      dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));
    }
  };

  const handleUpdateExpense = async (updatedExpense: PostExpenseDto, expenseId: number) => {
    try{
      const responseExpense: Expense = await updateExpense(updatedExpense, expenseId, JWT);
      if (responseExpense) dispatch(showAlert({ success: true, message: "Din Utgift är uppdaterad." }));
      fetchExpenses();
    } catch (error) {
      dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte uppdatera din Utgift." }));
    }
  };

  if (isAuthorized === false) return <></>

    return(
      <Container className='darkBackground mt-5'>
        <Row>
          <Col>
            <h3 className='text-center mp-green-text mb-3'>Ny Utgift</h3>
            <ExpenseBudgetForm fetchExpenses={fetchExpenses}/>
          </Col> 

          <Col>
          <div>

            <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate}/>

              <h4 className='text-center mp-green-text bg-dark mt-2'>Månadsvis</h4>
              {listOfExpenses
                .filter((expense) => expense.reOccuring)
                .map((expense) => (
                  <div key={expense.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(expense)}>
                      <EditIcon />
                    </Button>
                    <h5 className='fw-bold'>{expense.title}</h5>
                    <Button variant='danger' onClick={() => handleClickDelete(expense)}>
                      <DeleteForeverIcon />
                    </Button>
                    </div>                
                    <div className='d-flex justify-content-around'>
                      <p className='bg-dark rounded-1 p-1 text-danger'>-{expense.amount} kr</p>
                      <p className='bg-dark rounded-1 p-1'>När: {getFormattedDay(expense.date)}</p>
                    </div>                    
                    <hr />
                  </div>                  
                ))}
            </div>            

            <div>
              <h4 className='text-center mp-green-text bg-dark'>Andra utgifter</h4>
              {listOfExpenses
                .filter((expense) => !expense.reOccuring)
                .map((expense) => (
                  <div key={expense.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(expense)}>
                      <EditIcon />
                    </Button>
                    <h5 className='fw-bold'>{expense.title}</h5>
                    <Button variant='danger' onClick={() => handleClickDelete(expense)}>
                      <DeleteForeverIcon />
                    </Button>
                    </div>
                    <div className='d-flex justify-content-around'>
                      <p className='bg-dark rounded-1 p-1 text-danger'>-{expense.amount} kr</p>
                      <p className='bg-dark rounded-1 p-1'>{new Date(expense.date).toLocaleDateString()}</p>
                    </div>                    
                    <hr />
                  </div>
                ))}
            </div>
          </Col>           
        </Row>

        <ExpenseEditModal show={showEditModal} 
                         onHide={handleClose} 
                         expense={selectedExpense} 
                         onUpdateExpense={handleUpdateExpense} />

        <ExpenseDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDeleteConfirmed={() => handleDelete(selectedExpense?.id || 0)}
              />

      </Container>     
    )    
}
  
export default ExpenseView;