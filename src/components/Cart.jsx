import { Offcanvas, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import { thunkCartGet } from '../store/slices/cart.slice'
import { setCart } from '../store/slices/cart.slice'
import { setIsLoading } from '../store/slices/isLoading.slice';

const Cart = ({ show, handleClose, setShow }) => {

    const dispatch = useDispatch()
    const dispatchGet = useDispatch()
    const cart = useSelector(state => state.cart)
    let total = 0
    const navigate = useNavigate()

    let totalShopping = cart.map(product => (parseInt(product.product.price)))
    totalShopping.map(num => total += num)

    useEffect(() => {
        dispatch(thunkCartGet())
    }, [show])

    const deleteCart = () => {
        cart.map((element) => {
            axios.delete(`https://backendfesagadxecommerceapi.onrender.com/api/v1/cart/${element.id}`, {
            //axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${element.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => dispatchGet(setCart([])))
                .catch(error => console.log(error))
                .finally(() => {
                    setTimeout(() => {
                      dispatch(setIsLoading(false))
                    }, 1500);
                  });
        })
    }

    const dataUser = {
        "street": "Green St. 1456",
        "colony": "Southwest",
        "zipCode": 12345,
        "city": "USA",
        "references": "Some references"
    }
    console.log("cart",cart)
    const checkout = (purchases) => {
        console.log("purchases",purchases)
        axios.post('https://backendfesagadxecommerceapi.onrender.com/api/v1/purchase', purchases, {
        //axios.post('https://e-commerce-api.academlo.tech/api/v1/purchases', purchases, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                console.log("checkout",res)
                navigate('/purchase');
                setShow(!show);
                dispatchGet(setCart([]))
            })
            .catch(error => console.log(error))
            .finally(() => {
                setTimeout(() => {
                  dispatch(setIsLoading(false))
                }, 1500);
              });
    }

    const deleteElement = (elementId) => {
        axios.delete(`https://backendfesagadxecommerceapi.onrender.com/api/v1/cart/${elementId}`, {
        //axios.delete(`https://e-commerce-api.academlo.tech/api/v1/cart/${elementId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(() => dispatch(thunkCartGet()))
            .catch(error => console.log(error))
            .finally(() => {
                setTimeout(() => {
                  dispatch(setIsLoading(false))
                }, 1500);
              });
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                <Card className='article-select'>
                    <div className='body'>
                        {
                            cart.map((element, index) => {
                                return (
                                    <Card.Body key={index}>
                                        <div className='articles'>
                                            <Card.Title className='title'>{element.product.title}</Card.Title>
                                            <button onClick={() => deleteElement(element.id)} ><i className="bx bx-trash bx-md"></i></button>
                                        </div>
                                        <div className='total'>
                                            <Card.Text> <span>Total:</span> {element.product.price}</Card.Text>
                                        </div>
                                    </Card.Body>
                                )
                            })
                        }
                    </div>
                    <Card.Footer className="total-finish">
                        <div className='total-shopping'>
                            <Card.Title>Total:</Card.Title>
                            <Card.Text> {`$${total}`} </Card.Text>
                        </div>
                        <div className='btn-cart'>
                            {
                                cart.length !== 0 && <Button onClick={() => checkout(dataUser)}>Checkout</Button>
                            }
                            {
                                cart.length !== 0 && <Button onClick={() => deleteCart()}>All Delete</Button>
                            }
                            {
                                cart.length === 0 && <h2 className='inexistent'>No products selected</h2>
                            }
                        </div>
                    </Card.Footer>
                </Card>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default Cart