import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import AlertSuccess from '../components/Alert'
import { useState } from 'react'

const Register = () => {

    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (user) => {

        user.role = 'admin';
        axios.post('https://backendfesagadxecommerceapi.onrender.com/api/v1/users', user)
        //axios.post('https://e-commerce-api.academlo.tech/api/v1/users', user)
            .then(() => {
                setMsg({
                    msg: 'Se ha registrado con éxito',
                    color: 'success'
                })
                setAlert(true)
                setTimeout(() => {
                    navigate("/login")
                }, 3000)
            })
            .catch(error => {
                setMsg({
                    msg: error.response.data.message,
                    color: 'danger'
                })
                setAlert(true)
            })
    }

    return (
        <div className='register'>
            <div className='col-sm-9 col-md-5 col-12'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Text className="register-text">Sign Up</Form.Text>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            {...register('email')}
                        />
                    </Form.Group>

                    <Form.Group controlId="firstName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register('firstName')} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control {...register('lastName')} type="text" placeholder="Last Name" />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password(8 characters)</Form.Label>
                        <Form.Control {...register('password', { required: true, minLength: 8 })} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="phone">
                        <Form.Label>Phone (10 characters)</Form.Label>
                        <Form.Control {...register('phone', { required: true, minLength: 10, maxLength: 10 })} type="number" placeholder="Phone" />
                    </Form.Group>
                    <br></br>

                    <AlertSuccess isVisible={alert} dismiss={() => setAlert(false)} msg={msg}/>

                    <Button variant="primary" type="submit" className='col-12'>
                        Sign up
                    </Button>

                    <Form.Text id="passwordHelpBlock" muted>
                    Already have an account? <Link to={'/login'} >Log in</Link>
                    </Form.Text>
                </Form>
            </div>
        </div>
    )
}
export default Register;