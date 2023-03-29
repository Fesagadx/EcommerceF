import React from "react";
import { useDispatch } from 'react-redux';
import  { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import axios from 'axios';

import { getProductsThunk, filterCategoriesThunk, getFilterProducts, getFilterPrice } from '../store/slices/products.slice';
import { setIsLoading } from '../store/slices/isLoading.slice';

import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import {Col, Button} from 'react-bootstrap';


const Filters = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/categories`)
    //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/categories`)
      .then((resp) => setCategories(resp.data))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 1500);
      });
    dispatch(getProductsThunk());
  }, []);
  const submit = (data) => {
    dispatch(getFilterPrice(data));
  }

  return (
   < div> 
    <div className='filters-price'>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className='border-0'>
          <Accordion.Header variant="success" id="dropdown-basic" >Price</Accordion.Header>
          <Accordion.Body className='w-auto' show='onToggle'>
            <Form onSubmit={handleSubmit(submit)} >
              <Form.Group className="filters-price-group mb-3" controlId="formBasicPriceOne">
                <Form.Label style={{ width: '60px' }}>From</Form.Label>
                <Form.Control type="number" {...register("priceOne")}/>
              </Form.Group>
              <Form.Group className="filters-price-group mb-3" controlId="formBasicPriceTwo">
                <Form.Label style={{ width: '60px' }}>To</Form.Label>
                <Form.Control type="number" {...register("priceTwo")}/>
              </Form.Group>
              <Button className="filters-price-button" variant="primary" type="submit">
                Filter Price
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>

    <div className='filters-category'>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className='border-0'>
          <Accordion.Header variant="success" id="dropdown-basic">Category</Accordion.Header>
          <Accordion.Body className='w-auto' show='onToggle'>
            {categories.map((category, index) => (
              <Col key={index}>
                <Button className="filters-category-button" onClick={() => dispatch(filterCategoriesThunk(category.id))}>
                  {category.name}
                </Button>
              </Col>
            ))}
            <Button className="filters-category-button" onClick={() => dispatch(getProductsThunk())}>
              All
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  </div>
 
  );
};

export default Filters;