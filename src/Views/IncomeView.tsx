import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BudgetForm from '../Components/BudgetForm';
import { BudgetFormProps } from '../Models/Interfaces/BudgetFormProps';

const IncomeView: FC<BudgetFormProps> = (props) => {

    return(
      <Container className='darkBackground'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Inkomster</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <BudgetForm handleAlert={props.handleAlert} 
                        setAlertMessage={props.setAlertMessage}
                        userId={props.userId}/>
          </Col>
          <Col>
            <h3 className='mp-green-text'>Visa Inkomster</h3>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default IncomeView;