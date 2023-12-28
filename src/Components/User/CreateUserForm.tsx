import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import { PostUserDto } from '../../Models/Dto/PostUserDto';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from '../../Models/User';
import { postUser } from '../../Services/UserService';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { showAlert } from '../../Store/actionCreators';

const CreateUserForm: FC = () => {
  const navigate = useNavigate();   
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    username: Yup.string()
        .min(6, 'Måste vara minst 6 tecken')
        .max(50, 'Får inte vara längre än 50 tecken')
        .required('Obligatoriskt'),  
    password: Yup.string()
        .min(8, 'Måste vara minst 8 tecken')
        .matches(/[0-9]/, 'Måste vara minst en siffra')
        .matches(/[a-ö]/, 'Måste vara minst en liten bokstav')
        .matches(/[A-Ö]/, 'Måste vara minst en stor bokstav')
        .required('Obligatoriskt'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Lösenorden måste matcha')
        .required('Obligatoriskt'),
});

const formik = useFormik({
  initialValues: {
      username: '',      
      password: '',
      confirmPassword: '',
  },
  validationSchema,
  onSubmit: async values => {
    
      let postUservar: PostUserDto = {
          username: values.username,          
          password: values.password,
      }
      
      try {
          let userRepsonse: User = await postUser(postUservar);
          if (userRepsonse !== undefined) {            
            dispatch(showAlert({ success: true, message: "Ditt konto har skapats!" }));  
            navigate('/');
          }   
          else {
            dispatch(showAlert({ success: false, message: "Det gick inte att skapa kontot, försök igen!" }));
          }
      } catch (error) {            
            dispatch(showAlert({ success: false, message: "Det gick inte att skapa kontot, försök igen!" }));  
            console.log(error);
      }      
  },
});  

    return(
        
      <Container className='mt-3 p-2 d-flex justify-content-center darkBackground w-50'>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='mb-3 text-center mp-green-text bg-black rounded-2 p-1'>Registrera ny användare</h1>
                    <Form.Group className="mb-3 d-flex align-items-center">
                        <Form.Label column md={4} className='mx-2 text-light text-md-end'>Användarnamn: </Form.Label>
                        <Col md={8}>
                        <Form.Control
                            type="text"                          
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                            aria-label='username input'
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                        </Col>
                    </Form.Group>                  

                    <Form.Group className="mb-1 d-flex">
                        <Form.Label column md={4} className='mx-2 text-light text-md-end'>Lösenord: </Form.Label>
                        <Col md={8}>
                        <Form.Control 
                            type="password" 
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                            aria-label='password input'
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3 d-flex">
                        <Form.Label column md={4} className='mx-2 text-light text-md-end'>Upprepa Lösenord: </Form.Label>
                        <Col md={8}>
                        <Form.Control 
                            type="password" 
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                            aria-label='repeat-password input'
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback> 
                        </Col>
                    </Form.Group>

                    <div className='text-center'>
                        <Button className='m-1' variant="primary" type="submit">
                            Registera
                        </Button>
                    </div>
                    
                     
                </Col>                               
            </Row>
        </Form>

    </Container>  
    )    
}
  
  export default CreateUserForm;