import { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IncomeBudgetForm from '../Components/IncomeBudgetForm';
import { BudgetFormProps } from '../Models/Interfaces/BudgetFormProps';
import { Income } from '../Models/Income';
import { getIncomes } from '../Services/ApiService';

const IncomeView: FC<BudgetFormProps> = (props) => {
  const [listOfIncomes, setListOfIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      if (props.userId === undefined) return;
      try {
        const responseList: Income[] = await getIncomes(props.userId);
        setListOfIncomes(responseList);
      } catch (error) {
        props.handleAlert(true);
        props.setAlertMessage("Något gick fel när vi försökte hämta dina Inkomster.")
      }
    };
    fetchIncomes();
}, [props.userId]);

const getFormattedDay = (date: Date) => {
  const day = new Date(date).getDate();
  const suffix = (day === 1 || day === 2 || day === 21 || day === 31) ? 'a' : 'e';
  return `${day}${suffix}`;
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
            <IncomeBudgetForm handleAlert={props.handleAlert} 
                        setAlertMessage={props.setAlertMessage}
                        userId={props.userId}/>
          </Col>
          <Col>
            <div>
              <h4 className='text-center mp-green-text'>Månadsvis</h4>
              {listOfIncomes
                .filter((income) => income.reOccuring)
                .map((income) => (
                  <div key={income.id} className='text-light text-center p-1'>
                    {/* ADD EDIT BUTTON */}
                    <p className='fw-bold'>{income.title}</p>
                     {/* ADD DELETE BUTTON */}
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
                    {/* ADD EDIT BUTTON */}
                    <p className='fw-bold'>{income.title}</p>
                    {/* ADD DELETE BUTTON */}
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
      </Container>     
    )    
}
  
  export default IncomeView;