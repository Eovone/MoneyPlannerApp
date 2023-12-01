import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

interface IncomeViewProps {

}

const IncomeView: FC<IncomeViewProps> = (props) => {

    return(
      <Container className='darkBackground'>
        <Row>
          <Col>
            <h1 className='text-center mp-green-text'>Inkomster</h1>
          </Col>
        </Row>
      </Container>     
    )    
}
  
  export default IncomeView;