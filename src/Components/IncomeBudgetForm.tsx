import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PostIncomeDto } from '../Models/Dto/PostIncomeDto';
import { Income } from '../Models/Income';
import { postIncome } from '../Services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../Store/Store';
import { showAlert } from '../Store/actionCreators';

interface IncomeBudgetFormProps {
    fetchIncomes: () => void;
}

const IncomeBudgetForm: FC<IncomeBudgetFormProps> = (props) => {  

const dispatch = useDispatch();
const userId = useSelector((state: AppState) => state.userId);    

const formik = useFormik({
    initialValues: {
        title: '',
        amount: 0,
        date: new Date(),
        reOccuring: false,
    },
    onSubmit: async (values, { resetForm }) => {
        let postIncomeDto : PostIncomeDto = {
            title: values.title,
            amount: values.amount,
            date: values.date,
            reOccuring: values.reOccuring,
        }
        try {   
            let responseIncome : Income = await postIncome(postIncomeDto, userId);
            if(responseIncome){                  
                dispatch(showAlert({ success: true, message: "Inkomst är skapad." }));             
                resetForm();
                props.fetchIncomes();
            }
        } catch (error) {
            dispatch(showAlert({ success: false, message: "Något gick fel, försök igen!" }));               
        }
    },
}); 

    return(
    <Container className='darkBackground'>
        <Row>
        <Col>
            <Form noValidate onSubmit={formik.handleSubmit}>

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={4} className='mx-2 text-light text-md-end'>Titel: </Form.Label>
                <Col md={8}>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    isInvalid={formik.touched.title && !!formik.errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={4} className='mx-2 text-light text-md-end'>Summa: </Form.Label>
                <Col md={8}>
                    <Form.Control
                        type="number"
                        name="amount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                        isInvalid={formik.touched.amount && !!formik.errors.amount}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.amount}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={4} className='mx-2 text-light text-md-end'>Datum: </Form.Label>
                <Col md={8}>
                    <Form.Control
                        type="date"
                        name="date"
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            formik.setFieldValue("date", selectedDate);
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.date.toISOString().split('T')[0]}
                        isInvalid={formik.touched.date && !!formik.errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.date ? String(formik.errors.date) : ''}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={8} className='text-light text-md-end'>Återkommande varje månad: </Form.Label>
                <Col md={4}>
                    <Form.Check 
                        type='checkbox'
                        name='reOccuring'
                        onChange={(e) => {
                            formik.setFieldValue("reOccuring", e.target.checked);
                        }}
                        checked={formik.values.reOccuring}
                        isInvalid={formik.touched.reOccuring && !!formik.errors.reOccuring}  
                        className='text-center'
                        id="custom-checkbox"
                    />                  
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.reOccuring}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <div className='text-center'>
                <Button className='mt-3' variant="primary" type="submit">
                    Registrera Inkomst
                </Button>
            </div> 

            </Form>
        </Col>
        </Row>
    </Container>     
    )    
}
    
    export default IncomeBudgetForm;