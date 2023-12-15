import { FC } from 'react';
import { Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useNavigate } from "react-router-dom";
import { FormProps } from '../Models/Interfaces/FormProps';
import { useFormik } from 'formik';
import { PostUserDto } from '../Models/Dto/PostUserDto';
import { postLoginUser } from '../Services/ApiService';
import { LoggedInUserDto } from '../Models/Dto/LoggedInUserDto';
import { useDispatch } from 'react-redux';
import { updateUsername, setAuthStatus } from '../Store/actionCreators';

const LoginUserForm: FC<FormProps> = (props) => {
    const dispatch = useDispatch();
    const redirect = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async values => {
            let postLogin : PostUserDto = {
                username: values.username,
                password: values.password,
            }

            try {
                let response : LoggedInUserDto = await postLoginUser(postLogin);
                if(response.isAuthorized){
                    props.handleAlert(true);
                    props.setAlertMessage('Inloggning lyckades! Välkommen'); 

                    if (props.setUserId === undefined) return null;

                    dispatch(setAuthStatus(response.isAuthorized));
                    dispatch(updateUsername(postLogin.username));

                    props.setUserId(response.id);  

                    redirect('/Home');
                }
            } catch (error) {
                props.handleAlert(false);
                props.setAlertMessage('Inloggning misslyckades!');
            }
        },
    });

    return(
      <Container className='mt-3 p-2 d-flex justify-content-center darkBackground w-50'>
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className='align-items-center'>
                <Col className=''>
                    <h1 className='mb-3 text-center mp-green-text'>Logga in</h1>
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
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.password}
                        </Form.Control.Feedback>
                        </Col>
                    </Form.Group>                
                    
                    <div className='text-center'>
                        <Button className='mt-3' variant="primary" type="submit">
                            Logga in
                        </Button>
                    </div>                    
                    
                </Col>                               
            </Row>
        </Form>
    </Container>   

    )    
}
  
  export default LoginUserForm;