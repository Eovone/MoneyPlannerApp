import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import { PostUserDto } from '../Models/Dto/PostUserDto';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from '../Models/User';
import { postUser } from '../Services/ApiService';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";
import { FormProps } from '../Models/Interfaces/FormProps';

const CreateUserForm: FC<FormProps> = (props) => {
  const navigate = useNavigate();

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
            props.setAlertMessage('Ditt konto har skapats!')
            props.handleAlert(true);
            navigate('/');
          }   
      } catch (error) {
            props.setAlertMessage('Det gick inte att skapa kontot, försök igen!');
            props.handleAlert(false);
            console.log(error);
      }      
  },
});  

    return(
        
      <Container className='border border-4 border-dark mt-3 p-2 '>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col>
                    <h1 className='text-light mb-5 text-center'>Registrera ny användare</h1>
                    <Form.Group className="mb-3">
                        <Form.Label className='text-light'>Användarnamn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Användarnamn"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            isInvalid={formik.touched.username && !!formik.errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>                  

                    <Form.Group className="mb-1">
                        <Form.Label className='text-light'>Lösenord</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Lösenord"
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Upprepa Lösenord" 
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback> 
                    </Form.Group>

                    <Button className='m-1' variant="light" type="submit">
                        Registera
                    </Button>
                     
                </Col>                               
            </Row>
        </Form>

    </Container>  
    )    
}
  
  export default CreateUserForm;