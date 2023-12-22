import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface MonthSelectorProps {
    currentDate: Date;
    setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  }

const MonthSelector: FC<MonthSelectorProps> = (props) => {

const currentMonthEnd = new Date();
currentMonthEnd.setDate(1);
currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
currentMonthEnd.setDate(currentMonthEnd.getDate() - 1);

const month = props.currentDate.toLocaleString('default', { month: 'long' });
const year = props.currentDate.getFullYear();
 
const handlePrevMonth = () => {
    props.setCurrentDate(new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() - 1, 1));
};

const handleNextMonth = () => {
    const nextMonth = new Date(props.currentDate.getFullYear(), props.currentDate.getMonth() + 1, 1);
    const currentMonthEnd = new Date();
    currentMonthEnd.setDate(1);
    currentMonthEnd.setMonth(currentMonthEnd.getMonth() + 1);
    currentMonthEnd.setDate(currentMonthEnd.getDate() - 1);

    if (nextMonth <= currentMonthEnd) {
        props.setCurrentDate(nextMonth);
    }
};

  return (
    <div>
         <Row className='text-light'>
            <Col className='d-flex justify-content-end'>
                <Button onClick={handlePrevMonth}><ArrowBackIcon/></Button>
            </Col>
            <Col className='text-center'>
                <h4>{year}</h4>
                <h2>{month.toUpperCase()}</h2>
            </Col>
            <Col className='d-flex justify-content-start'>
                <Button onClick={handleNextMonth}><ArrowForwardIcon/></Button>
            </Col>  
          </Row>
    </div>
  )
};

export default MonthSelector;