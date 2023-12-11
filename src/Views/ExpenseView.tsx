import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface ExpenseViewProps {

}

const ExpenseView: FC<ExpenseViewProps> = (props) => {

    return(
      <Container className='darkBackground mt-5'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Utgifter</h1>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default ExpenseView;