import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IncomeBudgetForm from '../Components/IncomeBudgetForm';
import { Income } from '../Models/Income';
import { getIncomes, updateIncome } from '../Services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { showAlert } from '../Store/actionCreators';
import { Button } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IncomeEditModal from '../Components/IncomeEditModal';
import { PostIncomeDto } from '../Models/Dto/PostIncomeDto';

const IncomeView: FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: AppState) => state.userId);

  const [listOfIncomes, setListOfIncomes] = useState<Income[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  const fetchIncomes = async () => {
    try {
      const responseList: Income[] = await getIncomes(userId);
      setListOfIncomes(responseList);
    } catch (error) {        
      dispatch(showAlert({ success: false, message: "Något gick fel när vi försökte hämta dina Inkomster." })); 
    }
  };    

  useEffect(() => {    
    fetchIncomes();
  }, [userId, dispatch]);

const getFormattedDay = (date: Date) => {
  const day = new Date(date).getDate();
  const suffix = (day === 1 || day === 2 || day === 21 || day === 31) ? 'a' : 'e';
  return `${day}${suffix}`;
};

const handleEdit = (income: Income) => {  
  setSelectedIncome(income);
  setShowModal(true);
};

const handleClose = () => {
  setShowModal(false);
  setSelectedIncome(null);
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
            <IncomeBudgetForm />
          </Col>

          <Col>
            <div>
              <h4 className='text-center mp-green-text'>Månadsvis</h4>
              {listOfIncomes
                .filter((income) => income.reOccuring)
                .map((income) => (
                  <div key={income.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button>
                    <p className='fw-bold'>{income.title}</p>
                    <Button variant='danger'>
                      <DeleteForeverIcon />
                    </Button>
                    </div>
                    
                    <div className='d-flex justify-content-around'>
                      <p className='mp-darkgreen-bg rounded-1 p-1'>{income.amount} kr</p>
                      <p>När: {getFormattedDay(income.date)}</p>
                    </div>                    
                    <hr />
                  </div>                  
                ))}
            </div>            

            <div>
              <h4 className='text-center mp-green-text'>Övriga inkomster</h4>
              {listOfIncomes
                .filter((income) => !income.reOccuring)
                .map((income) => (
                  <div key={income.id} className='text-light text-center p-1'>
                    <div className='d-flex justify-content-between align-items-center mb-2'>
                    <Button variant='warning' onClick={() => handleEdit(income)}>
                      <EditIcon />
                    </Button>
                    <p className='fw-bold'>{income.title}</p>
                    <Button variant='danger'>
                      <DeleteForeverIcon />
                    </Button>
                    </div>
                    <div className='d-flex justify-content-around'>
                      <p className='mp-darkgreen-bg rounded-1 p-1'>{income.amount} kr</p>
                      <p>{new Date(income.date).toLocaleDateString()}</p>
                    </div>                    
                    <hr />
                  </div>
                ))}
            </div>
          </Col>
        </Row>
        
        <IncomeEditModal show={showModal} 
                         onHide={handleClose} 
                         income={selectedIncome} 
                         onUpdateIncome={handleUpdateIncome} />

      </Container>     
    )    
}
  
  export default IncomeView;