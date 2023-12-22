import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IncomeBudgetForm from '../Components/Income/IncomeBudgetForm';
import { Income } from '../Models/Income';
import { updateIncome, deleteIncome, getIncomesByMonth } from '../Services/IncomeService';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { showAlert } from '../Store/actionCreators';
import { Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IncomeEditModal from '../Components/Income/IncomeEditModal';
import { PostIncomeDto } from '../Models/Dto/PostIncomeDto';
import IncomeDeleteModal from '../Components/Income/IncomeDeleteModal';
import MonthSelector from '../Components/MonthSelector';

const IncomeView: FC = () => {

  const dispatch = useDispatch();
  const userId = useSelector((state: AppState) => state.userId);

  const [listOfIncomes, setListOfIncomes] = useState<Income[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchIncomes = async () => {
    try {
      const responseList: Income[] = await getIncomesByMonth(userId, currentDate.getFullYear(), currentDate.getMonth()+1);
      setListOfIncomes(responseList);
    } catch (error) {        
      dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta dina Inkomster." })); 
    }
  };    

  useEffect(() => {    
    fetchIncomes();
  }, [userId, dispatch, currentDate]);

const getFormattedDay = (date: Date) => {
  const day = new Date(date).getDate();
  const suffix = (day === 1 || day === 2 || day === 21 || day === 31) ? 'a' : 'e';
  return `${day}${suffix}`;
};

const handleEdit = (income: Income) => {  
  setSelectedIncome(income);
  setShowEditModal(true);
};

const handleClose = () => {
  setShowEditModal(false);
  setSelectedIncome(null);
};

const handleClickDelete = (income: Income) => {
  setSelectedIncome(income);
  setShowDeleteModal(true);
};

const handleDelete = async (incomeId: number) => {
  setShowDeleteModal(false);
  try {
    let responseStatus = await deleteIncome(incomeId);
    if (responseStatus === 204) {
      dispatch(showAlert({ success: true, message: "Din Inkomst är borttagen." }));
      setListOfIncomes(prevState => prevState.filter(income => income.id !== incomeId));
    }
    else {
      dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));  
    }
  } catch {
    dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));
  }
};

const handleUpdateIncome = async (updatedIncome: PostIncomeDto, incomeId: number) => {
  try{
    const responseIncome: Income = await updateIncome(updatedIncome, incomeId);
    if (responseIncome) dispatch(showAlert({ success: true, message: "Din Inkomst är uppdaterad." }));
    fetchIncomes();
  } catch (error) {
    dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte uppdatera din Inkomst." }));
  }
};

    return(
      <Container className='darkBackground mt-5'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text mb-3'>Inkomster</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className='text-center mp-green-text mb-3'>Ny Inkomst</h3>
            <IncomeBudgetForm fetchIncomes={fetchIncomes}/>
          </Col>          

          <Col>
            <div>            
              <MonthSelector currentDate={currentDate} setCurrentDate={setCurrentDate}/>

              <h4 className='text-center mp-green-text bg-dark mt-2'>Månadsvis</h4>
              {listOfIncomes
                .filter((income) => income.reOccuring)
                .map((income) => (
                  <div key={income.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button>
                    <h5 className='fw-bold'>{income.title}</h5>
                    <Button variant='danger' onClick={() => handleClickDelete(income)}>
                      <DeleteForeverIcon />
                    </Button>
                    </div>                
                    <div className='d-flex justify-content-around'>
                      <p className='bg-dark rounded-1 p-1 mp-green-text'>+{income.amount} kr</p>
                      <p className='bg-dark rounded-1 p-1'>När: {getFormattedDay(income.date)}</p>
                    </div>                    
                    <hr />
                  </div>                  
                ))}
            </div>            

            <div>
              <h4 className='text-center mp-green-text bg-dark'>Andra inkomster</h4>
              {listOfIncomes
                .filter((income) => !income.reOccuring)
                .map((income) => (
                  <div key={income.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button>
                    <h5 className='fw-bold'>{income.title}</h5>
                    <Button variant='danger' onClick={() => handleClickDelete(income)}>
                      <DeleteForeverIcon />
                    </Button>
                    </div>
                    <div className='d-flex justify-content-around'>
                      <p className='bg-dark rounded-1 p-1 mp-green-text'>+{income.amount} kr</p>
                      <p className='bg-dark rounded-1 p-1'>{new Date(income.date).toLocaleDateString()}</p>
                    </div>                    
                    <hr />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
        
        <IncomeEditModal show={showEditModal} 
                         onHide={handleClose} 
                         income={selectedIncome} 
                         onUpdateIncome={handleUpdateIncome} />

        <IncomeDeleteModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDeleteConfirmed={() => handleDelete(selectedIncome?.id || 0)}
              />

      </Container>     
    )    
}
  
  export default IncomeView;