import { FC } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { BudgetPlanItem } from '../../Models/BudgetPlanItem';

interface BudgetPlanningFormProps {
    budgetPlanList: BudgetPlanItem[];
    setBudgetPlanList: React.Dispatch<React.SetStateAction<BudgetPlanItem[]>>;
}

const BudgetPlanningForm: FC<BudgetPlanningFormProps> = (props) => {  

const formik = useFormik({
    initialValues: {
        title: '',
        amount: 0,
        isIncome: false,
    },
    onSubmit: async (values, { resetForm }) => {
        let budgetPlanItem : BudgetPlanItem = {
            title: values.title,
            amount: values.amount,
            isIncome: values.isIncome,
        }
        const updatedBudgetPlanList = [...props.budgetPlanList, budgetPlanItem];
        props.setBudgetPlanList(updatedBudgetPlanList);

        resetForm();       
    },
}); 

    return(
    <Container className='darkBackground'>        
        <Row>
        <h3 className='text-center mp-green-text mb-3 bg-black rounded-2 p-1'>Ny Inkomst/Utgift</h3>

        <Col>
            <Form noValidate onSubmit={formik.handleSubmit} >

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={4} className='mx-2 text-light text-md-end'>Titel: </Form.Label>
                <Col md={4}>
                <Form.Control
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    isInvalid={formik.touched.title && !!formik.errors.title}
                    aria-label='titel input'
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center custom-margin-right">
                <Form.Label column md={4} className='mx-2 text-light text-md-end'>Summa: </Form.Label>
                <Col md={4}>
                    <Form.Control
                        type="number"
                        name="amount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.amount}
                        isInvalid={formik.touched.amount && !!formik.errors.amount}
                        aria-label='amount input'
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.amount}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>  

            <Form.Group className="mb-3 text-center">
                <Col>
                    <Form.Check
                        inline
                        label="Inkomst"
                        type='radio'
                        id='income-radio'
                        name='isIncome'
                        value='true'
                        checked={formik.values.isIncome === true}
                        onChange={() => formik.setFieldValue('isIncome', true)}
                        aria-label='income-radio'
                    />
                    <Form.Check
                        inline
                        label="Utgift"
                        type='radio'
                        id='expense-radio'
                        name='isIncome'
                        value='false'
                        checked={formik.values.isIncome === false}
                        onChange={() => formik.setFieldValue('isIncome', false)}
                        aria-label='expense-radio'
                    />
                </Col>
            </Form.Group>

            <div className='text-center'>
                <Button className='mt-3' variant="primary" type="submit">
                    Lägg till
                </Button>
            </div> 

            </Form>
        </Col>
        </Row>
    </Container>     
    )    
}
    
export default BudgetPlanningForm;