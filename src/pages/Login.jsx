import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import AlertDismissibleExample from '../components/Alert';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate('/')
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password
    };

    axios.post(`https://backendfesagadxecommerceapi.onrender.com/api/v1/users/login`, data)
    //axios.post(`https://e-commerce-api.academlo.tech/api/v1/users/login`, data)
      .then(resp => {
        console.log("DATA",resp.data),
        localStorage.setItem('token', resp.data.token),
        localStorage.setItem('user', resp.data.user.firstName),
        navigate("/")
      })
      .catch(error => {
        console.log(error)
        setAlert(true)
      })
  }

  return (
    <div className='login-ini'>
      <div className='col-sm-9 col-md-5 col-12'>
        <Form className="login" onSubmit={(e) => handleSubmit(e)}>

          <Form.Group controlId="formBasicEmail">
            <Form.Text className="login-des">
              Welcome! Enter your email and password to continue
            </Form.Text>
            <br></br>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          
          <AlertDismissibleExample isVisible={alert} dismiss={() => setAlert(false)} msg={{ msg: 'Invalid credentials', color: 'secondary ' }}/>

          <Button variant="primary" type="submit" className='col-12'>
            Log in
          </Button>

          <Form.Text id="passwordHelpBlock" muted>
            Don´t have an account yet? <Link to={'/register'} >Sign up</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  )
}
export default Login