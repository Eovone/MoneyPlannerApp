import { FC } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { PostExpenseDto } from '../../Models/Dto/PostExpenseDto';
import { Expense } from '../../Models/Expense';

interface IncomeEditModalProps {
  show: boolean;
  onHide: () => void;
  expense: Expense | null;
  onUpdateExpense: (updatedExpense: PostExpenseDto, expenseId: number) => void;
}

const IncomeEditModal: FC<IncomeEditModalProps> = (props) => {
    const formik = useFormik({  
    enableReinitialize: true, 
    initialValues: {
        title: props.expense ? props.expense.title : '',
        amount: props.expense ? props.expense.amount : 0,
        date: props.expense ? new Date(props.expense.date) : new Date(),
        reOccuring: props.expense ? props.expense.reOccuring : false,
      },
    onSubmit: (values) => {
      let postExpenseDto: PostExpenseDto = {
        title: values.title,
        amount: values.amount,
        date: values.date,
        reOccuring: values.reOccuring,
      }
      if (props.expense === null) return;
      props.onUpdateExpense(postExpenseDto, props.expense.id);
      props.onHide();
    },
  });

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton className='mp-darkgreen-bg text-light'>
        <Modal.Title>Redigera Utgift</Modal.Title>
      </Modal.Header>
      <Modal.Body className='mp-darkgreen-bg text-light'>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Titel</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Summa</Form.Label>
            <Form.Control
              type='number'
              name='amount'
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Datum</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date.toISOString().split('T')[0]}
              isInvalid={formik.touched.date && !!formik.errors.date}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Check
              type='checkbox'
              name='reOccuring'
              label='Återkommande varje månad'
              checked={formik.values.reOccuring}
              onChange={formik.handleChange}
            />
          </Form.Group>
          <div className='d-flex justify-content-between'>
            <Button variant='danger' onClick={props.onHide}>
                Avbryt
            </Button>

            <Button variant='light' type='submit'>
                Uppdatera
            </Button>
          </div>
          
        </Form>
      </Modal.Body>      
    </Modal>
  );
};

export default IncomeEditModal;